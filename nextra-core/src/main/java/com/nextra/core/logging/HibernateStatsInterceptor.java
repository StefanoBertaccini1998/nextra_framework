package com.nextra.core.logging;

import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class HibernateStatsInterceptor {

    private final EntityManagerFactory emf;

    public long getQueryCount() {
        SessionFactory sf = emf.unwrap(SessionFactory.class);
        Statistics stats = sf.getStatistics();
        return stats.getQueryExecutionCount();
    }

    public void logStats(String correlationId) {
        SessionFactory sf = emf.unwrap(SessionFactory.class);
        Statistics stats = sf.getStatistics();
        long totalFetches = stats.getEntityFetchCount() + stats.getCollectionFetchCount();

        log.debug("📊 [Stats:{}] Queries: {}, Entities Loaded: {}, Fetch Count: {}",
                correlationId,
                stats.getQueryExecutionCount(),
                stats.getEntityLoadCount(),
                totalFetches);
    }

    public void clear() {
        emf.unwrap(SessionFactory.class).getStatistics().clear();
    }
}

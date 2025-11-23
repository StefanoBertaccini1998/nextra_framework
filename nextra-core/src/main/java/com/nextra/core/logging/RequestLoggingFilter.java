package com.nextra.core.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Principal;
import java.util.UUID;

@Slf4j
@Component
@Order(1) // runs early
public class RequestLoggingFilter extends OncePerRequestFilter {

    public static final String CORRELATION_HEADER = "X-Correlation-Id";
    public static final String MDC_CORRELATION_ID = "correlationId";
    public static final String MDC_METHOD = "method";
    public static final String MDC_PATH = "path";
    public static final String MDC_REMOTE_ADDR = "remoteAddr";
    public static final String MDC_USER = "user";

    @Autowired
    private HibernateStatsInterceptor hibernateStats;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String correlationId = extractOrGenerateCorrelationId(request);
        MDC.put(MDC_CORRELATION_ID, correlationId);
        MDC.put(MDC_METHOD, request.getMethod());
        MDC.put(MDC_PATH, request.getRequestURI());
        MDC.put(MDC_REMOTE_ADDR, request.getRemoteAddr());
        MDC.put(MDC_USER, extractUser(request));

        response.setHeader(CORRELATION_HEADER, correlationId);

        long start = System.nanoTime();

        try {
            filterChain.doFilter(request, response);
        } finally {
            long durationMs = (System.nanoTime() - start) / 1_000_000;
            int status = response.getStatus();

            log.info("Handled {} {} -> {} ({} ms)",
                    request.getMethod(),
                    request.getRequestURI(),
                    status,
                    durationMs);

            MDC.clear();
        }
    }

    private String extractOrGenerateCorrelationId(HttpServletRequest req) {
        String incoming = req.getHeader(CORRELATION_HEADER);
        return (StringUtils.hasText(incoming) ? incoming : UUID.randomUUID().toString());
    }

    private String extractUser(HttpServletRequest req) {
        Principal p = req.getUserPrincipal();
        return p != null ? p.getName() : "anonymous";
    }
}

package com.nextra.core.persistence;

import com.nextra.core.persistence.model.Auditable;
import jakarta.persistence.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test for auditing configuration.
 */
@SpringBootTest
@Transactional
class AuditingIntegrationTest {

    @PersistenceContext
    private EntityManager em;

    @AfterEach
    void clearContext() {
        SecurityContextHolder.clearContext();
    }

    @Entity(name = "AuditDemo")
    static class AuditDemo extends Auditable {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "val")
        private String value;

        public AuditDemo() {}
        public AuditDemo(String value) { this.value = value; }
        public Long getId() { return id; }
        public String getValue() { return value; }
        public void setValue(String v) { this.value = v; }
    }

    @Test
    void shouldAutoFillCreatedAndUpdatedBy_whenAuthenticated() {
        // Simulate logged-in user
        SecurityContextHolder.getContext().setAuthentication(
                new TestingAuthenticationToken("stefano", "pw", "ROLE_USER"));

        var demo = new AuditDemo("hello");
        em.persist(demo);
        em.flush();
        em.clear();

        var saved = em.find(AuditDemo.class, demo.getId());

        assertThat(saved.getCreatedBy()).isEqualTo("stefano");
        assertThat(saved.getUpdatedBy()).isEqualTo("stefano");
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getUpdatedAt()).isNotNull();
    }

    @Test
    void shouldUseSystemUser_whenNoAuthenticationPresent() {
        var demo = new AuditDemo("noAuth");
        em.persist(demo);
        em.flush();
        em.clear();

        var saved = em.find(AuditDemo.class, demo.getId());
        assertThat(saved.getCreatedBy()).isEqualTo("system");
        assertThat(saved.getUpdatedBy()).isEqualTo("system");
    }
}

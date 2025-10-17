package com.nextra.re;

import com.nextra.core.persistence.model.Auditable;
import jakarta.persistence.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class AuditingTest {

    @PersistenceContext
    private EntityManager em;

    @AfterEach
    void cleanup() {
        SecurityContextHolder.clearContext();
    }

    @Entity(name = "AuditDemo")
    static class AuditDemo extends Auditable {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "val") // 👈 FIXED: rename the column
        private String value;

        public AuditDemo() {}
        public AuditDemo(String v) { this.value = v; }
        public Long getId() { return id; }
        public String getValue() { return value; }
        public void setValue(String v) { this.value = v; }
    }

    @Test
    void createdBy_and_updatedBy_are_set_from_security_context() {
        // Simulate authenticated user
        SecurityContextHolder.getContext().setAuthentication(
                new TestingAuthenticationToken("auditUser", "pw", "ROLE_USER"));

        var entity = new AuditDemo("hello");
        em.persist(entity);
        em.flush();
        em.clear();

        var found = em.find(AuditDemo.class, entity.getId());
        assertThat(found.getCreatedBy()).isEqualTo("auditUser");
        assertThat(found.getUpdatedBy()).isEqualTo("auditUser");

        // update
        found.setValue("changed");
        em.merge(found);
        em.flush();
        em.clear();

        var updated = em.find(AuditDemo.class, entity.getId());
        assertThat(updated.getUpdatedBy()).isEqualTo("auditUser");
        assertThat(updated.getCreatedAt()).isNotNull();
        assertThat(updated.getUpdatedAt()).isNotNull();
    }
}

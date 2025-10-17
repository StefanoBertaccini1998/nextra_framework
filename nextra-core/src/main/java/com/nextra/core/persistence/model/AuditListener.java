package com.nextra.core.persistence.model;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuditListener {

    @PrePersist
    public void beforeCreate(Object entity) {
        log.debug("[AUDIT] Creating entity: {}", entity.getClass().getSimpleName());
    }

    @PreUpdate
    public void beforeUpdate(Object entity) {
        log.debug("[AUDIT] Updating entity: {}", entity.getClass().getSimpleName());
    }
}

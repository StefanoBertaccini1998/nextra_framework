package com.nextra.core.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Base class providing automatic auditing of entities.
 * All JPA entities should extend this for consistent metadata.
 */
@Getter
@Setter
@MappedSuperclass
@EntityListeners({AuditingEntityListener.class, AuditListener.class})
public abstract class Auditable {

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy = "system";

    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy = "system";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

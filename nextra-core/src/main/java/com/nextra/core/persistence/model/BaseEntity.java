package com.nextra.core.persistence.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;


@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
@ToString(callSuper = true)
@EntityListeners(AuditListener.class)
@SQLDelete(sql = "UPDATE #{#entityName} SET deleted = true WHERE id = ?")
@SQLRestriction("deleted = false")
public abstract class BaseEntity extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean deleted = false;
}

package com.nextra.re.persistence.model;

import com.nextra.core.persistence.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@SuperBuilder
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "properties")
public class Property extends BaseEntity {

    @Column(nullable = false)
    private String name;

    private String address;

    @Column(precision = 15, scale = 2)
    private BigDecimal price;

    private Double sizeSqm;

    @Column(length = 2000)
    private String description;

    // 🔹 Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    @ToString.Exclude
    private Account owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @ToString.Exclude
    private Category category;
}

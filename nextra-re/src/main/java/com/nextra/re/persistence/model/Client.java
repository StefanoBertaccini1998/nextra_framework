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
@Table(name = "clients")
public class Client extends BaseEntity {

    @Column(nullable = false)
    private String name;

    private String email;

    private String phone;

    @Column(name = "fiscal_id", unique = true)
    private String fiscalId;

    private String address;

    @Column(name = "preferred_budget_min", precision = 15, scale = 2)
    private BigDecimal preferredBudgetMin;

    @Column(name = "preferred_budget_max", precision = 15, scale = 2)
    private BigDecimal preferredBudgetMax;

    @Column(name = "preferred_locations", length = 1000)
    private String preferredLocations; // comma separated

    @Column(name = "preferred_property_types", length = 500)
    private String preferredPropertyTypes;

    private Double preferredSizeMin;

    private Double preferredSizeMax;

    @Column(length = 2000)
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_agent_id")
    @ToString.Exclude
    private Account assignedAgent;
}
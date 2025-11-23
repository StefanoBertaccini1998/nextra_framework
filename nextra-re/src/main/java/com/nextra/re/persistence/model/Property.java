package com.nextra.re.persistence.model;

import com.nextra.core.persistence.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
    private String title;

    private String location;

    private String address;

    @Column(precision = 15, scale = 2)
    private BigDecimal price;

    @Column(name = "size_sqm")
    private Double size;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type")
    private PropertyType propertyType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PropertyStatus status;

    @Column(name = "bedrooms")
    private Integer bedrooms;

    @Column(name = "bathrooms")
    private Integer bathrooms;

    @Column(name = "floors")
    private Integer floors;

    @Column(name = "year_built")
    private Integer yearBuilt;

    @Column(length = 2000)
    private String features;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image_url", length = 500)
    @Builder.Default
    private List<String> images = new ArrayList<>();

    @Column(name = "main_image", length = 500)
    private String mainImage;

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

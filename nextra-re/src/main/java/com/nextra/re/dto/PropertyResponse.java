package com.nextra.re.dto;

import com.nextra.re.persistence.model.PropertyStatus;
import com.nextra.re.persistence.model.PropertyType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class PropertyResponse {
    private Long id;
    private String title;
    private String location;
    private String address;
    private BigDecimal price;
    private Double size;
    private String description;
    private PropertyType propertyType;
    private PropertyStatus status;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer floors;
    private Integer yearBuilt;
    private String features;
    private List<String> images;
    private String mainImage;

    private Long ownerId;
    private String ownerName;
    private Long categoryId;
    private String categoryName;

    private String createdBy;
    private String updatedBy;
    private String createdAt;
    private String updatedAt;
}

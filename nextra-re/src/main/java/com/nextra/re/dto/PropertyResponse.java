package com.nextra.re.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PropertyResponse {
    private Long id;
    private String name;
    private String address;
    private BigDecimal price;
    private Double sizeSqm;
    private String description;

    private Long ownerId;
    private String ownerName;
    private Long categoryId;
    private String categoryName;

    private String createdBy;
    private String updatedBy;
    private String createdAt;
    private String updatedAt;
}

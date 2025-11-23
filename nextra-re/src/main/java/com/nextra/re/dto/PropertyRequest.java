package com.nextra.re.dto;

import com.nextra.re.persistence.model.PropertyStatus;
import com.nextra.re.persistence.model.PropertyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class PropertyRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String location;

    private String address;

    @NotNull(message = "Price cannot be null")
    @Positive(message = "Price must be greater than zero")
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

    // simple references instead of nested JSON
    private Long ownerId;
    private Long categoryId;
}

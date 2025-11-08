package com.nextra.re.api.controller;

import com.nextra.core.api.BaseController;
import com.nextra.core.api.ApiResponse;
import com.nextra.re.dto.PropertyRequest;
import com.nextra.re.dto.PropertyResponse;
import com.nextra.re.persistence.model.Property;
import com.nextra.re.persistence.service.AccountService;
import com.nextra.re.persistence.service.CategoryService;
import com.nextra.re.persistence.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController extends BaseController<Property, Long> {

    private final PropertyService propertyService;
    private final AccountService accountService;
    private final CategoryService categoryService;

    public PropertyController(PropertyService propertyService, AccountService accountService, CategoryService categoryService) {
        super(propertyService);
        this.propertyService = propertyService;
        this.accountService = accountService;
        this.categoryService = categoryService;
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<ApiResponse<List<Property>>> getByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(ApiResponse.ok(propertyService.findByOwner(ownerId)));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<Property>>> getByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(ApiResponse.ok(propertyService.findByCategory(categoryId)));
    }

    @GetMapping("/price")
    public ResponseEntity<ApiResponse<List<Property>>> getByPriceRange(
            @RequestParam Double min,
            @RequestParam Double max
    ) {
        return ResponseEntity.ok(ApiResponse.ok(propertyService.findByPriceRange(min, max)));
    }

    private Property toEntity(PropertyRequest dto) {
        Property entity = new Property();
        entity.setName(dto.getName());
        entity.setAddress(dto.getAddress());
        entity.setPrice(dto.getPrice());
        entity.setSizeSqm(dto.getSizeSqm());
        entity.setDescription(dto.getDescription());

        if (dto.getOwnerId() != null)
            accountService.findById(dto.getOwnerId()).ifPresent(entity::setOwner);

        if (dto.getCategoryId() != null)
            categoryService.findById(dto.getCategoryId()).ifPresent(entity::setCategory);

        return entity;
    }


    private PropertyResponse toResponse(Property entity) {
        return PropertyResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .address(entity.getAddress())
                .price(entity.getPrice())
                .sizeSqm(entity.getSizeSqm())
                .description(entity.getDescription())
                .ownerId(entity.getOwner() != null ? entity.getOwner().getId() : null)
                .ownerName(entity.getOwner() != null ? entity.getOwner().getName() : null)
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : null)
                .createdBy(entity.getCreatedBy())
                .updatedBy(entity.getUpdatedBy())
                .createdAt(entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : null)
                .updatedAt(entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null)
                .build();
    }


}

package com.nextra.re.api.controller;

import com.nextra.core.api.BaseController;
import com.nextra.core.api.ApiResponse;
import com.nextra.re.dto.PropertyRequest;
import com.nextra.re.dto.PropertyResponse;
import com.nextra.re.persistence.model.Property;
import com.nextra.re.persistence.service.AccountService;
import com.nextra.re.persistence.service.CategoryService;
import com.nextra.re.persistence.service.PropertyImageService;
import com.nextra.re.persistence.service.PropertyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/properties")
public class PropertyController extends BaseController<Property, Long> {

    private final PropertyService propertyService;
    private final AccountService accountService;
    private final CategoryService categoryService;
    private final PropertyImageService propertyImageService;

    public PropertyController(
            PropertyService propertyService,
            AccountService accountService,
            CategoryService categoryService,
            PropertyImageService propertyImageService
    ) {
        super(propertyService);
        this.propertyService = propertyService;
        this.accountService = accountService;
        this.categoryService = categoryService;
        this.propertyImageService = propertyImageService;
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
        entity.setTitle(dto.getTitle());
        entity.setLocation(dto.getLocation());
        entity.setAddress(dto.getAddress());
        entity.setPrice(dto.getPrice());
        entity.setSize(dto.getSize());
        entity.setDescription(dto.getDescription());
        entity.setPropertyType(dto.getPropertyType());
        entity.setStatus(dto.getStatus());
        entity.setBedrooms(dto.getBedrooms());
        entity.setBathrooms(dto.getBathrooms());
        entity.setFloors(dto.getFloors());
        entity.setYearBuilt(dto.getYearBuilt());
        entity.setFeatures(dto.getFeatures());
        entity.setImages(dto.getImages());
        entity.setMainImage(dto.getMainImage());

        if (dto.getOwnerId() != null)
            accountService.findById(dto.getOwnerId()).ifPresent(entity::setOwner);

        if (dto.getCategoryId() != null)
            categoryService.findById(dto.getCategoryId()).ifPresent(entity::setCategory);

        return entity;
    }


    private PropertyResponse toResponse(Property entity) {
        return PropertyResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .location(entity.getLocation())
                .address(entity.getAddress())
                .price(entity.getPrice())
                .size(entity.getSize())
                .description(entity.getDescription())
                .propertyType(entity.getPropertyType())
                .status(entity.getStatus())
                .bedrooms(entity.getBedrooms())
                .bathrooms(entity.getBathrooms())
                .floors(entity.getFloors())
                .yearBuilt(entity.getYearBuilt())
                .features(entity.getFeatures())
                .images(entity.getImages())
                .mainImage(entity.getMainImage())
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

    // ==================== Image Management Endpoints ====================
    
    /**
     * Upload images for a property
     * POST /api/properties/{id}/images
     */
    @PostMapping("/{id}/images")
    public ResponseEntity<ApiResponse<List<String>>> uploadImages(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam(defaultValue = "true") boolean setAsMain
    ) {
        try {
            List<String> imageUrls = propertyImageService.uploadImages(id, files, setAsMain);
            log.info("Uploaded {} images for property {}", imageUrls.size(), id);
            return ResponseEntity.ok(ApiResponse.ok(imageUrls));
        } catch (IOException e) {
            log.error("Failed to upload images for property {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to upload images: " + e.getMessage()));
        } catch (IllegalArgumentException e) {
            log.warn("Invalid image upload request for property {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Set main image for a property
     * PUT /api/properties/{id}/images/main
     */
    @PutMapping("/{id}/images/main")
    public ResponseEntity<ApiResponse<Void>> setMainImage(
            @PathVariable Long id,
            @RequestParam String imageUrl
    ) {
        try {
            propertyImageService.setMainImage(id, imageUrl);
            return ResponseEntity.ok(ApiResponse.ok(null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Delete an image from a property
     * DELETE /api/properties/{id}/images
     */
    @DeleteMapping("/{id}/images")
    public ResponseEntity<ApiResponse<Void>> deleteImage(
            @PathVariable Long id,
            @RequestParam String imageUrl
    ) {
        try {
            propertyImageService.deleteImage(id, imageUrl);
            return ResponseEntity.ok(ApiResponse.ok(null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}

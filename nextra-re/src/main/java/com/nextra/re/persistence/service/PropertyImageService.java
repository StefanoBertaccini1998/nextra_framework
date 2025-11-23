package com.nextra.re.persistence.service;

import com.nextra.core.storage.StorageResult;
import com.nextra.core.storage.StorageService;
import com.nextra.re.persistence.model.Property;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Service for managing property images.
 * Uses the storage service from nextra-core for actual file operations.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PropertyImageService {
    
    private static final String PROPERTY_IMAGES_FOLDER = "properties";
    private static final int MAX_IMAGES_PER_PROPERTY = 10;
    
    private final StorageService storageService;
    private final PropertyService propertyService;
    
    /**
     * Upload images for a property
     * 
     * @param propertyId The property ID
     * @param files The image files to upload
     * @param setAsMain If true, the first image will be set as the main image
     * @return List of uploaded image URLs
     * @throws IOException if upload fails
     */
    @Transactional
    public List<String> uploadImages(Long propertyId, List<MultipartFile> files, boolean setAsMain) throws IOException {
        Property property = propertyService.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property not found: " + propertyId));
        
        // Check total images limit
        int currentImageCount = property.getImages() != null ? property.getImages().size() : 0;
        if (currentImageCount + files.size() > MAX_IMAGES_PER_PROPERTY) {
            throw new IllegalArgumentException(
                    String.format("Cannot upload %d images. Maximum %d images per property allowed (current: %d)",
                            files.size(), MAX_IMAGES_PER_PROPERTY, currentImageCount));
        }
        
        List<String> uploadedUrls = new ArrayList<>();
        
        for (MultipartFile file : files) {
            // Validate image file
            validateImageFile(file);
            
            // Upload to storage
            StorageResult result = storageService.uploadFile(file, PROPERTY_IMAGES_FOLDER);
            uploadedUrls.add(result.getPublicUrl());
            
            log.info("Uploaded image for property {}: {}", propertyId, result.getPublicUrl());
        }
        
        // Update property with new image URLs
        if (property.getImages() == null) {
            property.setImages(new ArrayList<>());
        }
        property.getImages().addAll(uploadedUrls);
        
        // Set first image as main if requested and no main image exists
        if (setAsMain && !uploadedUrls.isEmpty() && property.getMainImage() == null) {
            property.setMainImage(uploadedUrls.get(0));
        }
        
        propertyService.save(property);
        
        return uploadedUrls;
    }
    
    /**
     * Set the main image for a property
     * 
     * @param propertyId The property ID
     * @param imageUrl The image URL to set as main (must be in property's images list)
     */
    @Transactional
    public void setMainImage(Long propertyId, String imageUrl) {
        Property property = propertyService.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property not found: " + propertyId));
        
        if (property.getImages() == null || !property.getImages().contains(imageUrl)) {
            throw new IllegalArgumentException("Image URL not found in property images");
        }
        
        property.setMainImage(imageUrl);
        propertyService.save(property);
        
        log.info("Set main image for property {}: {}", propertyId, imageUrl);
    }
    
    /**
     * Delete an image from a property
     * 
     * @param propertyId The property ID
     * @param imageUrl The image URL to delete
     */
    @Transactional
    public void deleteImage(Long propertyId, String imageUrl) {
        Property property = propertyService.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property not found: " + propertyId));
        
        if (property.getImages() != null) {
            property.getImages().remove(imageUrl);
        }
        
        // Clear main image if it was the deleted image
        if (imageUrl.equals(property.getMainImage())) {
            property.setMainImage(property.getImages() != null && !property.getImages().isEmpty() 
                    ? property.getImages().get(0) 
                    : null);
        }
        
        propertyService.save(property);
        
        // Extract file ID from URL and delete from storage
        String fileId = extractFileIdFromUrl(imageUrl);
        if (fileId != null) {
            storageService.deleteFile(fileId);
        }
        
        log.info("Deleted image from property {}: {}", propertyId, imageUrl);
    }
    
    /**
     * Delete all images for a property
     * 
     * @param propertyId The property ID
     */
    @Transactional
    public void deleteAllImages(Long propertyId) {
        Property property = propertyService.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property not found: " + propertyId));
        
        if (property.getImages() != null) {
            for (String imageUrl : property.getImages()) {
                String fileId = extractFileIdFromUrl(imageUrl);
                if (fileId != null) {
                    storageService.deleteFile(fileId);
                }
            }
            property.getImages().clear();
        }
        
        property.setMainImage(null);
        propertyService.save(property);
        
        log.info("Deleted all images from property {}", propertyId);
    }
    
    /**
     * Validate that the uploaded file is a valid image
     */
    private void validateImageFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Cannot upload empty file");
        }
        
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("File must be an image (jpeg, png, gif, etc.)");
        }
        
        // Check file size (max 10MB)
        long maxSize = 10 * 1024 * 1024; // 10MB
        if (file.getSize() > maxSize) {
            throw new IOException("Image file size must not exceed 10MB");
        }
    }
    
    /**
     * Extract file ID from storage URL
     * Example: http://localhost:8080/uploads/properties/abc-123-def.jpg -> abc-123-def
     */
    private String extractFileIdFromUrl(String url) {
        if (url == null) {
            return null;
        }
        
        try {
            String filename = url.substring(url.lastIndexOf('/') + 1);
            int dotIndex = filename.lastIndexOf('.');
            return dotIndex > 0 ? filename.substring(0, dotIndex) : filename;
        } catch (Exception e) {
            log.warn("Failed to extract file ID from URL: {}", url, e);
            return null;
        }
    }
}

package com.nextra.core.storage.impl;

import com.nextra.core.storage.StorageProvider;
import com.nextra.core.storage.StorageResult;
import com.nextra.core.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * Local filesystem implementation of StorageService.
 * Stores files in a local directory and serves them via HTTP.
 * 
 * This is the default, free implementation suitable for:
 * - Development and testing
 * - Small to medium deployments
 * - When cloud storage costs are a concern
 * 
 * Limitations:
 * - Not suitable for distributed/clustered deployments
 * - Limited by disk space
 * - No built-in CDN or geographic distribution
 */
@Slf4j
@Service
public class LocalStorageService implements StorageService {
    
    @Value("${storage.local.base-path:./uploads}")
    private String basePath;
    
    @Value("${storage.local.base-url:http://localhost:8080}")
    private String baseUrl;
    
    private Path uploadPath;
    
    @PostConstruct
    public void init() {
        try {
            uploadPath = Paths.get(basePath);
            Files.createDirectories(uploadPath);
            log.info("Local storage initialized at: {}", uploadPath.toAbsolutePath());
        } catch (IOException e) {
            log.error("Failed to initialize local storage directory", e);
            throw new RuntimeException("Could not initialize local storage", e);
        }
    }
    
    @Override
    public StorageResult uploadFile(MultipartFile file, String folder) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Cannot upload empty file");
        }
        
        return uploadFile(
            file.getInputStream(),
            file.getOriginalFilename(),
            file.getContentType(),
            folder
        );
    }
    
    @Override
    public StorageResult uploadFile(InputStream inputStream, String filename, String contentType, String folder) throws IOException {
        // Generate unique file ID
        String fileId = UUID.randomUUID().toString();
        String extension = getFileExtension(filename);
        String storedFilename = fileId + extension;
        
        // Create folder path if specified
        Path targetPath = uploadPath;
        if (folder != null && !folder.isEmpty()) {
            targetPath = uploadPath.resolve(folder);
            Files.createDirectories(targetPath);
        }
        
        // Save file
        Path filePath = targetPath.resolve(storedFilename);
        Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Get file size
        long fileSize = Files.size(filePath);
        
        // Build public URL
        String publicUrl = buildPublicUrl(folder, storedFilename);
        
        log.info("File uploaded: {} -> {} ({})", filename, fileId, publicUrl);
        
        return StorageResult.builder()
                .fileId(fileId)
                .originalFilename(filename)
                .storedFilename(storedFilename)
                .publicUrl(publicUrl)
                .fileSize(fileSize)
                .contentType(contentType)
                .provider(StorageProvider.LOCAL)
                .build();
    }
    
    @Override
    public boolean deleteFile(String fileId) {
        try {
            // Try to find and delete the file in any subfolder
            Path file = findFile(fileId);
            if (file != null && Files.exists(file)) {
                Files.delete(file);
                log.info("File deleted: {}", fileId);
                return true;
            }
            log.warn("File not found for deletion: {}", fileId);
            return false;
        } catch (IOException e) {
            log.error("Failed to delete file: {}", fileId, e);
            return false;
        }
    }
    
    @Override
    public String getFileUrl(String fileId) {
        Path file = findFile(fileId);
        if (file != null) {
            Path relativePath = uploadPath.relativize(file);
            return baseUrl + "/uploads/" + relativePath.toString().replace("\\", "/");
        }
        return null;
    }
    
    @Override
    public boolean fileExists(String fileId) {
        return findFile(fileId) != null;
    }
    
    @Override
    public StorageProvider getProvider() {
        return StorageProvider.LOCAL;
    }
    
    /**
     * Find a file in the upload directory by its ID
     */
    private Path findFile(String fileId) {
        try {
            return Files.walk(uploadPath)
                    .filter(Files::isRegularFile)
                    .filter(path -> path.getFileName().toString().startsWith(fileId))
                    .findFirst()
                    .orElse(null);
        } catch (IOException e) {
            log.error("Error searching for file: {}", fileId, e);
            return null;
        }
    }
    
    /**
     * Extract file extension from filename
     */
    private String getFileExtension(String filename) {
        if (filename == null) {
            return "";
        }
        int lastDot = filename.lastIndexOf('.');
        if (lastDot > 0) {
            return filename.substring(lastDot);
        }
        return "";
    }
    
    /**
     * Build the public URL for accessing a file
     */
    private String buildPublicUrl(String folder, String filename) {
        StringBuilder url = new StringBuilder(baseUrl);
        url.append("/uploads/");
        if (folder != null && !folder.isEmpty()) {
            url.append(folder).append("/");
        }
        url.append(filename);
        return url.toString();
    }
}

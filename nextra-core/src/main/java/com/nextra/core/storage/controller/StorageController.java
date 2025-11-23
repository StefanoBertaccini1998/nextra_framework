package com.nextra.core.storage.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Controller for serving uploaded files from local storage.
 * Provides a simple HTTP endpoint to access stored files.
 */
@Slf4j
@RestController
@RequestMapping("/uploads")
@RequiredArgsConstructor
public class StorageController {
    
    @Value("${storage.local.base-path:./uploads}")
    private String basePath;
    
    /**
     * Serve a file from local storage
     * GET /uploads/{folder}/{filename}
     * GET /uploads/{filename}
     */
    @GetMapping(value = {"/{filename:.+}", "/{folder}/{filename:.+}"})
    public ResponseEntity<Resource> serveFile(
            @PathVariable(required = false) String folder,
            @PathVariable String filename
    ) {
        try {
            // Build file path
            Path uploadPath = Paths.get(basePath);
            Path filePath = folder != null 
                    ? uploadPath.resolve(folder).resolve(filename)
                    : uploadPath.resolve(filename);
            
            // Check if file exists
            if (!Files.exists(filePath) || !Files.isRegularFile(filePath)) {
                log.warn("File not found: {}", filePath);
                return ResponseEntity.notFound().build();
            }
            
            // Load file as Resource
            Resource resource = new UrlResource(filePath.toUri());
            
            if (!resource.exists() || !resource.isReadable()) {
                log.warn("File not readable: {}", filePath);
                return ResponseEntity.notFound().build();
            }
            
            // Determine content type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }
            
            // Return file with appropriate headers
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                            "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
                    
        } catch (IOException e) {
            log.error("Error serving file: {}/{}", folder, filename, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}

package com.nextra.core.storage;

import lombok.Builder;
import lombok.Data;

/**
 * Result of a file upload operation containing the stored file's metadata.
 */
@Data
@Builder
public class StorageResult {
    /**
     * Unique identifier for the stored file
     */
    private String fileId;
    
    /**
     * Original filename
     */
    private String originalFilename;
    
    /**
     * Stored filename (may be different from original)
     */
    private String storedFilename;
    
    /**
     * Public URL to access the file
     */
    private String publicUrl;
    
    /**
     * File size in bytes
     */
    private Long fileSize;
    
    /**
     * MIME type (e.g., image/jpeg, image/png)
     */
    private String contentType;
    
    /**
     * Storage provider used
     */
    private StorageProvider provider;
}

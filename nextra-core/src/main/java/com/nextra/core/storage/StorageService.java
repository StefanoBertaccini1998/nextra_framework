package com.nextra.core.storage;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;

/**
 * Storage service interface for file operations.
 * Implementations can use local filesystem, S3, Azure, MinIO, etc.
 * 
 * This interface follows the Strategy pattern to allow easy switching
 * between different storage providers without changing business logic.
 */
public interface StorageService {
    
    /**
     * Upload a file to storage
     * 
     * @param file The multipart file to upload
     * @param folder Optional folder/prefix for organizing files (e.g., "properties", "avatars")
     * @return StorageResult containing file metadata and access URL
     * @throws IOException if upload fails
     */
    StorageResult uploadFile(MultipartFile file, String folder) throws IOException;
    
    /**
     * Upload a file from an input stream
     * 
     * @param inputStream The input stream containing file data
     * @param filename Original filename
     * @param contentType MIME type of the file
     * @param folder Optional folder/prefix
     * @return StorageResult containing file metadata and access URL
     * @throws IOException if upload fails
     */
    StorageResult uploadFile(InputStream inputStream, String filename, String contentType, String folder) throws IOException;
    
    /**
     * Delete a file from storage
     * 
     * @param fileId The unique identifier of the file to delete
     * @return true if deletion was successful, false otherwise
     */
    boolean deleteFile(String fileId);
    
    /**
     * Get the public URL for accessing a stored file
     * 
     * @param fileId The unique identifier of the file
     * @return The public URL to access the file
     */
    String getFileUrl(String fileId);
    
    /**
     * Check if a file exists in storage
     * 
     * @param fileId The unique identifier of the file
     * @return true if file exists, false otherwise
     */
    boolean fileExists(String fileId);
    
    /**
     * Get the storage provider type
     * 
     * @return The storage provider being used
     */
    StorageProvider getProvider();
}

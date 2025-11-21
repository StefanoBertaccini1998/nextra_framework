package com.nextra.core.storage;

/**
 * Enum representing different storage providers.
 * This allows for easy switching between storage implementations.
 */
public enum StorageProvider {
    LOCAL,      // Local filesystem storage (default, free)
    S3,         // Amazon S3 (scalable cloud storage)
    AZURE,      // Azure Blob Storage
    MINIO       // MinIO (S3-compatible, self-hosted)
}

package com.nextra.core.common.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
 * Minimal AES/GCM encrypt/decrypt helper for sensitive fields at-rest.
 * NOTE: Store the key safely (env/secret manager). IV must be unique per call.
 */
public final class EncryptionUtils {

    private EncryptionUtils() {}

    public static String encryptAESGCM(byte[] key, byte[] iv, String plaintext) {
        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            var spec = new GCMParameterSpec(128, iv);
            cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, "AES"), spec);
            byte[] enc = cipher.doFinal(plaintext.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(enc);
        } catch (Exception e) {
            throw new IllegalStateException("Encryption failed", e);
        }
    }

    public static String decryptAESGCM(byte[] key, byte[] iv, String base64Cipher) {
        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            var spec = new GCMParameterSpec(128, iv);
            cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"), spec);
            byte[] dec = cipher.doFinal(Base64.getDecoder().decode(base64Cipher));
            return new String(dec, java.nio.charset.StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException("Decryption failed", e);
        }
    }
}

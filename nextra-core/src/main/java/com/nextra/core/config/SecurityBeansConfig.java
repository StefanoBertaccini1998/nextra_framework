package com.nextra.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Security-related shared beans that must be independent
 * from the main SecurityConfig to avoid circular dependencies.
 *
 * This configuration provides the secure BCrypt encoder for
 * non-dev profiles. A separate dev-only configuration can
 * override the PasswordEncoder when the `dev` profile is active.
 */
@Configuration
@Profile("!dev")
public class SecurityBeansConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

package com.nextra.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Dev-only security bean overrides. In `dev` profile we provide
 * a NoOpPasswordEncoder so you can store plain passwords in the
 * H2 dev database for easier local testing. This configuration
 * is intentionally limited to the `dev` profile.
 */
@Configuration
@Profile("dev")
public class DevSecurityBeansConfig {

    @Bean
    @SuppressWarnings("deprecation")
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}

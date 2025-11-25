package com.nextra.core.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Development helper: ensures `admin` user has a known plain password
 * during local development so you can login without bcrypt.
 */
@Component
@Profile("dev")
public class DevAdminPasswordOverride implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DevAdminPasswordOverride.class);

    private final JdbcTemplate jdbc;

    public DevAdminPasswordOverride(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        log.info("DevAdminPasswordOverride bean constructed (dev profile)");
    }

    @Override
    public void run(ApplicationArguments args) {
        log.info("DevAdminPasswordOverride ApplicationRunner executing (dev profile)");
        try {
            int updated = jdbc.update("UPDATE users SET password = ? WHERE username = ?", "password", "admin");
            if (updated > 0) {
                log.info("DevAdminPasswordOverride: updated admin password to plain 'password' ({} rows)", updated);
            } else {
                log.warn("DevAdminPasswordOverride: no admin user found to update");
            }
        } catch (Exception e) {
            log.error("DevAdminPasswordOverride: error while updating admin password", e);
        }
    }
}

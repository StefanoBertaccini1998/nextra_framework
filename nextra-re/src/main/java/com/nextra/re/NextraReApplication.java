package com.nextra.re;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.nextra.re",
        "com.nextra.core" // include core beans, but not duplicate @EnableJpaAuditing
})
@EnableJpaRepositories(basePackages = {
        "com.nextra.re",
        "com.nextra.core.persistence"
})
public class NextraReApplication {
    public static void main(String[] args) {
        SpringApplication.run(NextraReApplication.class, args);
    }
}

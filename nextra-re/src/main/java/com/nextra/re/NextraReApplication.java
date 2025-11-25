package com.nextra.re;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.nextra.re",
        "com.nextra.core", // include core beans, but not duplicate @EnableJpaAuditing
        "com.nextra.core.config"  
    })
@EnableJpaRepositories(basePackages = {
        "com.nextra.re",
        "com.nextra.core.persistence",
        "com.nextra.core.security.repository"
})
public class NextraReApplication {
    public static void main(String[] args) {
           var ctx = SpringApplication.run(NextraReApplication.class, args);
           // Log all ApplicationRunner beans present
           String[] runnerBeans = ctx.getBeanNamesForType(org.springframework.boot.ApplicationRunner.class);
           System.out.println("[Startup] ApplicationRunner beans present:");
           for (String bean : runnerBeans) {
              System.out.println(" - " + bean + " (" + ctx.getBean(bean).getClass().getName() + ")");
           }
    }
}

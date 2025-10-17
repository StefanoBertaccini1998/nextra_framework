package com.nextra.core.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Around("@annotation(com.nextra.core.logging.Loggable)")
    public Object logExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        String method = joinPoint.getSignature().toShortString();
        long start = System.currentTimeMillis();

        log.info("▶️ START: {}", method);
        try {
            Object result = joinPoint.proceed();
            long time = System.currentTimeMillis() - start;
            log.info("✅ END: {} ({} ms)", method, time);
            return result;
        } catch (Exception e) {
            log.error("❌ ERROR in {}: {}", method, e.getMessage(), e);
            throw e;
        }
    }
}

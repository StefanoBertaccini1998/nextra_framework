package com.nextra.core.security;

import com.nextra.core.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtTokenProviderTest {

    @Autowired
    private JwtTokenProvider jwtProvider;

    @Test
    void generateAndValidateToken() {
        String token = jwtProvider.generateToken("testuser");
        assertTrue(jwtProvider.validateToken(token));
    }
}

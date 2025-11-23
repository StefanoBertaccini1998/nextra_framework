package com.nextra.core.security;

import com.nextra.core.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("dev")
class JwtSanityTest {
    @Autowired
    private JwtTokenProvider jwt;

    @Test
    void shouldGenerateAndValidateToken() {
        String token = jwt.generateToken("testuser");
        assertTrue(jwt.validateToken(token));
        assertEquals("testuser", jwt.getUsernameFromToken(token));
    }
}

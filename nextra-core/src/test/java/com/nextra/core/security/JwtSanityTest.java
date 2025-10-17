package com.nextra.core.security;

import com.nextra.core.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JwtSanityTest {
    @Test
    void shouldGenerateAndValidateToken() {
        JwtTokenProvider jwt = new JwtTokenProvider();
        String token = jwt.generateToken("demo");
        assertTrue(jwt.validateToken(token));
        assertEquals("demo", jwt.getUsernameFromToken(token));
    }
}

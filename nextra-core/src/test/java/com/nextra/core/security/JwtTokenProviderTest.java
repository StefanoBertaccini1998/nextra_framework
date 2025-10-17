package com.nextra.core.security;

import com.nextra.core.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private final JwtTokenProvider jwt = new JwtTokenProvider();

    @Test
    void generateAndValidateToken() {
        String token = jwt.generateToken("stefano");
        assertNotNull(token);
        assertTrue(jwt.validateToken(token));
        assertEquals("stefano", jwt.getUsernameFromToken(token));
    }
}

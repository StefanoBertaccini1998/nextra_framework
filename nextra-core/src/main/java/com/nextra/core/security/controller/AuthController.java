package com.nextra.core.security.controller;

import com.nextra.core.api.ApiResponse;
import com.nextra.core.security.dto.AuthResponse;
import com.nextra.core.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequest request) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        var principal = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        String token = jwtProvider.generateToken(principal.getUsername());

        return ResponseEntity.ok(ApiResponse.ok(new AuthResponse(token)));
    }

    public record LoginRequest(String username, String password) { }
}

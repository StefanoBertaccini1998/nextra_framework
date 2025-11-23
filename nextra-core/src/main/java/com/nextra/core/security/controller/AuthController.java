package com.nextra.core.security.controller;

import com.nextra.core.api.ApiResponse;
import com.nextra.core.security.dto.AuthResponse;
import com.nextra.core.security.jwt.JwtTokenProvider;
import com.nextra.core.security.model.Role;
import com.nextra.core.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtProvider;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequest request) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        var principal = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        String token = jwtProvider.generateToken(principal.getUsername());

        // Load full user details from database
        var user = userService.findByUsername(principal.getUsername());

        AuthResponse authResponse = AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet()))
                .build();

        return ResponseEntity.ok(ApiResponse.ok(authResponse));
    }

    public record LoginRequest(String username, String password) { }
}

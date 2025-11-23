package com.nextra.core.security.controller;

import com.nextra.core.api.ApiResponse;
import com.nextra.core.api.BaseController;
import com.nextra.core.security.dto.UserCreateRequest;
import com.nextra.core.security.dto.UserDTO;
import com.nextra.core.security.dto.UserUpdateRequest;
import com.nextra.core.security.model.User;
import com.nextra.core.security.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController extends BaseController<User, Long> {

    private final UserService userService;

    public UserController(UserService userService) {
        super(userService);
        this.userService = userService;
    }

    /**
     * Get current authenticated user profile
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(ApiResponse.ok(userService.toDTO(user)));
    }

    /**
     * Get all users (ADMIN only)
     * Note: This doesn't use pagination like BaseController's getAll
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> users = userService.findAll().stream()
                .map(userService::toDTO)
                .toList();
        return ResponseEntity.ok(ApiResponse.ok(users));
    }

    /**
     * Get user by username (ADMIN only)
     */
    @GetMapping("/username/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(ApiResponse.ok(userService.toDTO(user)));
    }

    /**
     * Get active users (ADMIN only)
     */
    @GetMapping("/active")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getActiveUsers() {
        List<UserDTO> users = userService.findActiveUsers().stream()
                .map(userService::toDTO)
                .toList();
        return ResponseEntity.ok(ApiResponse.ok(users));
    }

    /**
     * Get users by role (ADMIN only)
     */
    @GetMapping("/role/{roleName}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getUsersByRole(@PathVariable String roleName) {
        String fullRoleName = roleName.startsWith("ROLE_") ? roleName : "ROLE_" + roleName;
        List<UserDTO> users = userService.findByRoleName(fullRoleName).stream()
                .map(userService::toDTO)
                .toList();
        return ResponseEntity.ok(ApiResponse.ok(users));
    }

    /**
     * Create new user (ADMIN only)
     * Overrides BaseController's create to use UserCreateRequest
     */
    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<User>> create(@RequestBody User entity) {
        // This method is not used - clients should use createUser instead
        throw new UnsupportedOperationException("Use POST with UserCreateRequest instead");
    }

    /**
     * Create new user (ADMIN only)
     */
    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@Valid @RequestBody UserCreateRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(userService.toDTO(user)));
    }

    /**
     * Update user (ADMIN can update any, users can update themselves)
     * Overrides BaseController's update to use UserUpdateRequest
     */
    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<ApiResponse<User>> update(@PathVariable("id") Long id, @RequestBody User entity) {
        // This method is not used - clients should use the UserUpdateRequest version
        throw new UnsupportedOperationException("Use PUT with UserUpdateRequest instead");
    }

    /**
     * Update user with DTO (ADMIN can update any, users can update themselves)
     */
    @PutMapping("/{id}/update")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<ApiResponse<UserDTO>> updateUserWithDTO(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        User user = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.ok(userService.toDTO(user)));
    }

    /**
     * Get user by ID (ADMIN only)
     * Overrides BaseController's getById to return DTO
     */
    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<User>> getById(@PathVariable("id") Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(value -> ResponseEntity.ok(ApiResponse.ok(value)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("User not found")));
    }

    /**
     * Delete user (ADMIN only)
     * Overrides BaseController's delete
     */
    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }
}

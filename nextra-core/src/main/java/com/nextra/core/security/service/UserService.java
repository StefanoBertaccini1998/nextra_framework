package com.nextra.core.security.service;

import com.nextra.core.common.exceptions.ResourceNotFoundException;
import com.nextra.core.persistence.service.BaseService;
import com.nextra.core.security.dto.UserCreateRequest;
import com.nextra.core.security.dto.UserDTO;
import com.nextra.core.security.dto.UserUpdateRequest;
import com.nextra.core.security.model.Role;
import com.nextra.core.security.model.User;
import com.nextra.core.security.repository.RoleRepository;
import com.nextra.core.security.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class UserService implements BaseService<User, Long> {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User save(User entity) {
        log.info("💾 Saving user: {}", entity.getUsername());
        return userRepository.save(entity);
    }

    @Override
    public User update(Long id, User entity) {
        log.info("🛠 Updating user with id: {}", id);
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        entity.setId(id);
        return userRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        log.warn("🗑 Deleting user with id: {}", id);
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }

    public List<User> findActiveUsers() {
        return userRepository.findByActiveTrue();
    }

    public List<User> findByRoleName(String roleName) {
        return userRepository.findByRoles_Name(roleName);
    }

    @Transactional
    public User createUser(UserCreateRequest request) {
        log.info("Creating new user: {}", request.getUsername());

        // Check if username or email already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists: " + request.getUsername());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + request.getEmail());
        }

        // Build user entity
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .active(request.isActive())
                .roles(resolveRoles(request.getRoleNames()))
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long id, UserUpdateRequest request) {
        log.info("Updating user with id: {}", id);

        User user = findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Email already exists: " + request.getEmail());
            }
            user.setEmail(request.getEmail());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        if (request.getRoleNames() != null) {
            user.setRoles(resolveRoles(request.getRoleNames()));
        }

        return userRepository.save(user);
    }

    public UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .active(user.isActive())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .createdBy(user.getCreatedBy())
                .updatedBy(user.getUpdatedBy())
                .build();
    }

    private Set<Role> resolveRoles(Set<String> roleNames) {
        if (roleNames == null || roleNames.isEmpty()) {
            // Default to NORMAL role
            Role normalRole = roleRepository.findByName("ROLE_NORMAL")
                    .orElseThrow(() -> new ResourceNotFoundException("Default role ROLE_NORMAL not found"));
            return Set.of(normalRole);
        }

        Set<Role> roles = new HashSet<>();
        for (String roleName : roleNames) {
            String fullRoleName = roleName.startsWith("ROLE_") ? roleName : "ROLE_" + roleName;
            Role role = roleRepository.findByName(fullRoleName)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + fullRoleName));
            roles.add(role);
        }
        return roles;
    }
}

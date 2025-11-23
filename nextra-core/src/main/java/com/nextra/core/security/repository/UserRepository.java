package com.nextra.core.security.repository;

import com.nextra.core.persistence.repository.BaseRepository;
import com.nextra.core.security.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<User> findByActiveTrue();

    List<User> findByRoles_Name(String roleName);
}

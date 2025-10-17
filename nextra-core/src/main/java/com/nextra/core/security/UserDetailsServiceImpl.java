package com.nextra.core.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;

/**
 * Temporary simple in-memory user service.
 * Later will load users from the database.
 */
@Service
@Primary
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // temporary static user, for tests only
        if (username.equalsIgnoreCase("admin")) {
            return User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("password"))// {noop} = no password encoder
                    .authorities(Collections.emptyList())
                    .build();
        }
        throw new UsernameNotFoundException("User not found: " + username);
    }
}

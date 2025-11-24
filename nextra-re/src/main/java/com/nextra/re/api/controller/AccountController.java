package com.nextra.re.api.controller;

import com.nextra.core.api.ApiResponse;
import com.nextra.core.api.BaseController;
import com.nextra.re.persistence.model.Account;
import com.nextra.re.persistence.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing real estate agent accounts.
 * Requires ADMIN role for all write operations.
 */
@RestController
@RequestMapping("/api/accounts")
public class AccountController extends BaseController<Account, Long> {
    
    public AccountController(AccountService service) {
        super(service);
    }
    
    // Override create to require ADMIN role
    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Account>> create(@RequestBody Account entity) {
        return super.create(entity);
    }
    
    // Override update to require ADMIN role
    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Account>> update(@PathVariable Long id, @RequestBody Account entity) {
        return super.update(id, entity);
    }
    
    // Override delete to require ADMIN role
    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}

package com.nextra.re.api.controller;

import com.nextra.core.api.ApiResponse;
import com.nextra.core.api.BaseController;
import com.nextra.re.persistence.model.Category;
import com.nextra.re.persistence.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing property categories.
 * Requires ADMIN role for all write operations.
 */
@RestController
@RequestMapping("/api/categories")
public class CategoryController extends BaseController<Category, Long> {
    
    public CategoryController(CategoryService service) {
        super(service);
    }
    
    // Override create to require ADMIN role
    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Category>> create(@RequestBody Category entity) {
        return super.create(entity);
    }
    
    // Override update to require ADMIN role
    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Category>> update(@PathVariable Long id, @RequestBody Category entity) {
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

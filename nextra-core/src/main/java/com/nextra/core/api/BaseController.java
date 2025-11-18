package com.nextra.core.api;

import com.nextra.core.persistence.service.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Generic REST controller exposing CRUD and pagination endpoints.
 * Extend this in your domain controllers (e.g. PropertyController).
 */
@Slf4j
public abstract class BaseController<T, ID> {

    protected final BaseService<T, ID> service;

    protected BaseController(BaseService<T, ID> service) {
        this.service = service;
    }

    // 🔹 CREATE
    @PostMapping
    public ResponseEntity<ApiResponse<T>> create(@RequestBody T entity) {
        log.info("➡️ [POST] Creating entity: {}", entity);
        T saved = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(saved));
    }

    // 🔹 READ ALL (paginated or not)
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<T>>> getAll(@PageableDefault(size = 10, sort = "id") Pageable pageable) {
        log.info("➡️ [GET] Fetching all entities (page={}, size={}, sort={})",
                pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());

        Page<T> page = service.findAll(pageable);
        PagedResponse<T> paged = PagedResponse.from(page);
        return ResponseEntity.ok(ApiResponse.ok(paged));
    }

    // 🔹 READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<T>> getById(@PathVariable("id") ID id) {
        log.info("➡️ [GET] Fetching entity with id: {}", id);
        Optional<T> entity = service.findById(id);
        return entity.map(value -> ResponseEntity.ok(ApiResponse.ok(value)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Entity not found")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<T>> update(@PathVariable("id") ID id, @RequestBody T entity) {
        log.info("➡️ [PUT] Updating entity with id: {}", id);
        T updated = service.update(id, entity);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable("id") ID id) {
        log.warn("➡️ [DELETE] Soft deleting entity with id: {}", id);
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    // 🔹 RESTORE (if supported)
    @PatchMapping("/{id}/restore")
    public ResponseEntity<ApiResponse<Void>> restore(@PathVariable("id") ID id) {
        log.info("➡️ [PATCH] Restoring entity with id: {}", id);
        try {
            var method = service.getClass().getMethod("restore", id.getClass());
            method.invoke(service, id);
            return ResponseEntity.ok(ApiResponse.ok(null));
        } catch (NoSuchMethodException e) {
            log.error("Restore not supported for entity type {}", service.getClass());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                    .body(ApiResponse.error("Restore not supported for this entity"));
        } catch (Exception e) {
            log.error("Error restoring entity: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Error restoring entity"));
        }
    }
}

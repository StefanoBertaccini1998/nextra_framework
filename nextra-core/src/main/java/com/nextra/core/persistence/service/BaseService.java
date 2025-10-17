package com.nextra.core.persistence.service;

import java.util.List;
import java.util.Optional;

/**
 * Defines the standard service operations for all entities.
 * Every domain service (e.g. PropertyService) should extend this.
 */
public interface BaseService<T, ID> {

    T save(T entity);

    T update(ID id, T entity);

    void delete(ID id);

    Optional<T> findById(ID id);

    default List<T> findAll() { throw new UnsupportedOperationException(); }
    default org.springframework.data.domain.Page<T> findAll(org.springframework.data.domain.Pageable pageable) {
        throw new UnsupportedOperationException();
    }
}

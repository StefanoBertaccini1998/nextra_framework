package com.nextra.core.persistence.service;

import com.nextra.core.common.exceptions.ResourceNotFoundException;
import com.nextra.core.persistence.model.BaseEntity;
import com.nextra.core.persistence.repository.BaseRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Generic service implementation providing CRUD logic and logging.
 * Automatically handles soft delete when the entity extends BaseEntity.
 */
@Slf4j
@Transactional
public abstract class BaseServiceImpl<T extends BaseEntity, ID> implements BaseService<T, ID> {

    @Autowired
    protected BaseRepository<T, ID> repository;

    @Override
    public T save(T entity) {
        log.info("💾 Saving entity: {}", entity);
        return repository.save(entity);
    }

    @Override
    public T update(ID id, T entity) {
        log.info("🛠 Updating entity with id: {}", id);
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Entity not found with id: " + id);
        }
        entity.setId((Long) id);
        return repository.save(entity);
    }

    @Override
    public void delete(ID id) {
        log.warn("🗑 Soft-deleting entity with id: {}", id);
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Entity not found with id: " + id);
        }
        repository.softDelete(id);
    }

    public void restore(ID id) {
        log.info("♻️ Restoring entity with id: {}", id);
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Entity not found with id: " + id);
        }
        repository.restore(id);
    }

    @Override
    public Optional<T> findById(ID id) {
        log.debug("🔍 Fetching entity with id: {}", id);
        return repository.findById(id);
    }

    @Override
    public List<T> findAll() {
        log.debug("📋 Fetching all active entities");
        return repository.findAllActive();
    }

    public List<T> findAllIncludingDeleted() {
        log.debug("📂 Fetching all entities (including deleted)");
        return repository.findAllIncludingDeleted();
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        log.debug("📖 Fetching paginated entities: {}", pageable);
        return repository.findAll(pageable);
    }
}

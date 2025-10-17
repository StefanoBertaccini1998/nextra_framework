package com.nextra.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Generic repository base interface to be extended by all repositories.
 * Adds soft-delete and restore helpers.
 */
@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {

    @Transactional
    @Modifying
    @Query("UPDATE #{#entityName} e SET e.deleted = true WHERE e.id = :id")
    void softDelete(ID id);

    @Transactional
    @Modifying
    @Query("UPDATE #{#entityName} e SET e.deleted = false WHERE e.id = :id")
    void restore(ID id);

    @Query("SELECT e FROM #{#entityName} e WHERE e.deleted = false")
    List<T> findAllActive();

    @Query("SELECT e FROM #{#entityName} e")
    List<T> findAllIncludingDeleted();
}

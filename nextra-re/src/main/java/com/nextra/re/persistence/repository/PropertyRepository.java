package com.nextra.re.persistence.repository;

import com.nextra.core.persistence.repository.BaseRepository;
import com.nextra.re.persistence.model.Property;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends BaseRepository<Property, Long> {

    List<Property> findByOwnerId(Long accountId);

    List<Property> findByCategoryId(Long categoryId);

    List<Property> findByPriceBetween(Double min, Double max);
}

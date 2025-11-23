package com.nextra.re.persistence.service;

import com.nextra.core.persistence.service.BaseService;
import com.nextra.re.persistence.model.Property;

import java.util.List;

public interface PropertyService extends BaseService<Property, Long> {
    List<Property> findByOwner(Long ownerId);
    List<Property> findByCategory(Long categoryId);
    List<Property> findByPriceRange(Double min, Double max);
}

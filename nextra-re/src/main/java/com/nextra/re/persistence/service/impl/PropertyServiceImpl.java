package com.nextra.re.persistence.service.impl;

import com.nextra.re.persistence.model.Property;
import com.nextra.re.persistence.repository.PropertyRepository;
import com.nextra.re.persistence.service.PropertyService;
import com.nextra.core.persistence.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyServiceImpl extends BaseServiceImpl<Property, Long> implements PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
        this.repository = propertyRepository;
    }

    @Override
    public List<Property> findByOwner(Long ownerId) {
        return propertyRepository.findByOwnerId(ownerId);
    }

    @Override
    public List<Property> findByCategory(Long categoryId) {
        return propertyRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Property> findByPriceRange(Double min, Double max) {
        return propertyRepository.findByPriceBetween(min, max);
    }
}

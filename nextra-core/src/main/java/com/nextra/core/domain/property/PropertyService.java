package com.nextra.core.domain.property;

import com.nextra.core.persistence.service.BaseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService implements BaseService<Property, Long> {

    private final PropertyRepository repository;

    public PropertyService(PropertyRepository repository) {
        this.repository = repository;
    }

    @Override
    public Property save(Property entity) {
        return repository.save(entity);
    }

    @Override
    public Property update(Long id, Property entity) {
        Property existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Property not found with id " + id));

        existing.setName(entity.getName());
        existing.setAddress(entity.getAddress());
        existing.setPrice(entity.getPrice());
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Property> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Property> findAll() {
        return repository.findAll();
    }

    @Override
    public Page<Property> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}

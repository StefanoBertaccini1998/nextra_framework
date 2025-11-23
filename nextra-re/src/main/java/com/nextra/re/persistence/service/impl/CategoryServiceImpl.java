package com.nextra.re.persistence.service.impl;

import com.nextra.core.persistence.service.impl.BaseServiceImpl;
import com.nextra.re.persistence.model.Category;
import com.nextra.re.persistence.repository.CategoryRepository;
import com.nextra.re.persistence.service.CategoryService;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends BaseServiceImpl<Category, Long> implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.repository = categoryRepository; // ✅ assign base protected field
    }

}

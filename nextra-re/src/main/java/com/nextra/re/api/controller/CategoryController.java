package com.nextra.re.api.controller;

import com.nextra.core.api.BaseController;
import com.nextra.re.persistence.model.Category;
import com.nextra.re.persistence.service.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController extends BaseController<Category, Long> {
    public CategoryController(CategoryService service) {
        super(service);
    }
}

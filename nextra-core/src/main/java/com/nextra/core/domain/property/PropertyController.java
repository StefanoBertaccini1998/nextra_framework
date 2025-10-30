package com.nextra.core.domain.property;

import com.nextra.core.api.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/properties")
public class PropertyController extends BaseController<Property, Long> {

    public PropertyController(PropertyService service) {
        super(service);
    }
}

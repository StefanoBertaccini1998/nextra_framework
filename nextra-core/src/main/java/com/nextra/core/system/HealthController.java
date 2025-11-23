package com.nextra.core.system;

import com.nextra.core.api.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("api/health")
    public ApiResponse<String> health(){
        return ApiResponse.ok("NEXTRA Core is running");
    }
}

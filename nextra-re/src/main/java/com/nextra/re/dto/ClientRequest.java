// java
package com.nextra.re.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    @NotBlank(message = "Fiscal ID is required")
    private String fiscalId;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    private BigDecimal preferredBudgetMin;
    private BigDecimal preferredBudgetMax;
    private String preferredLocations;
    private String preferredPropertyTypes;
    private Double preferredSizeMin;
    private Double preferredSizeMax;
    private String notes;
    private Long assignedAgentId;
}
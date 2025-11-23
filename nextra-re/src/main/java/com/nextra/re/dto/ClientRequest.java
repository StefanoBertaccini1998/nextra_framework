// java
package com.nextra.re.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientRequest {
    private String name;
    private String email;
    private String phone;
    private String fiscalId;
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
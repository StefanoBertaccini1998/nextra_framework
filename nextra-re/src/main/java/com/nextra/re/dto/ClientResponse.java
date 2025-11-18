// java
package com.nextra.re.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class ClientResponse {
    private Long id;
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
    private String assignedAgentName;
    private String createdBy;
    private String updatedBy;
    private String createdAt;
    private String updatedAt;
}
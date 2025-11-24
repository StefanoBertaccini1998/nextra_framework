package com.nextra.re.dto;

import com.nextra.re.persistence.model.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    private Long userId;
    private String username;
    private Long clientId;
    private String clientName;
    private Long propertyId;
    private String propertyTitle;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String notes;
    private String location;
    private AppointmentStatus status;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
}

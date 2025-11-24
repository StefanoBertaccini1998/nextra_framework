package com.nextra.re.dto;

import com.nextra.re.persistence.model.AppointmentStatus;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentUpdateRequest {

    private Long clientId;

    private Long propertyId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Size(max = 2000, message = "Notes cannot exceed 2000 characters")
    private String notes;

    @Size(max = 500, message = "Location cannot exceed 500 characters")
    private String location;

    private AppointmentStatus status;

    @Size(max = 500, message = "Title cannot exceed 500 characters")
    private String title;
}

package com.nextra.re.dto;

import com.nextra.re.persistence.model.AppointmentStatus;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
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
public class AppointmentCreateRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    private Long clientId;

    private Long propertyId;

    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;

    @Size(max = 2000, message = "Notes cannot exceed 2000 characters")
    private String notes;

    @Size(max = 500, message = "Location cannot exceed 500 characters")
    private String location;

    @Builder.Default
    @NotNull(message = "Status is required")
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;

    @Size(max = 500, message = "Title cannot exceed 500 characters")
    private String title;
}

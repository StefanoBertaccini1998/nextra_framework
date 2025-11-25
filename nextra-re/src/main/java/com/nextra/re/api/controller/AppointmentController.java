package com.nextra.re.api.controller;

import com.nextra.core.api.ApiResponse;
import com.nextra.core.api.BaseController;
import com.nextra.core.common.exceptions.BadRequestException;
import com.nextra.core.common.exceptions.ResourceNotFoundException;
import com.nextra.core.security.model.User;
import com.nextra.core.security.service.UserService;
import com.nextra.re.dto.AppointmentCreateRequest;
import com.nextra.re.dto.AppointmentDTO;
import com.nextra.re.dto.AppointmentUpdateRequest;
import com.nextra.re.persistence.model.Appointment;
import com.nextra.re.persistence.model.AppointmentStatus;
import com.nextra.re.persistence.model.Client;
import com.nextra.re.persistence.model.Property;
import com.nextra.re.persistence.service.AppointmentService;
import com.nextra.re.persistence.service.ClientService;
import com.nextra.re.persistence.service.PropertyService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController extends BaseController<Appointment, Long> {

    private final AppointmentService appointmentService;
    private final UserService userService;
    private final ClientService clientService;
    private final PropertyService propertyService;

    public AppointmentController(
            AppointmentService appointmentService,
            UserService userService,
            ClientService clientService,
            PropertyService propertyService) {
        super(appointmentService);
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.clientService = clientService;
        this.propertyService = propertyService;
        log.info("✅ AppointmentController initialized");
    }

    /**
     * Override BaseController update to avoid ambiguous mapping
     * Use updateAppointment endpoint instead
     */
    @Override
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Appointment>> update(@PathVariable("id") Long id, @RequestBody Appointment entity) {
        throw new UnsupportedOperationException("Use PUT /api/appointments/{id}/update with AppointmentUpdateRequest instead");
    }

    /**
     * Override BaseController delete to avoid ambiguous mapping
     * Use deleteAppointment endpoint instead
     */
    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable("id") Long id) {
        throw new UnsupportedOperationException("Use DELETE /api/appointments/{id}/delete instead");
    }

    /**
     * Override BaseController create to avoid ambiguous mapping
     * Use createAppointment endpoint instead
     */
    @Override
    @PostMapping
    public ResponseEntity<ApiResponse<Appointment>> create(@RequestBody Appointment entity) {
        throw new UnsupportedOperationException("Use POST /api/appointments with AppointmentCreateRequest instead");
    }

    /**
     * Get current user's appointments
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getMyAppointments() {
        log.debug("📅 Fetching appointments for current user");
        String username = getCurrentUsername();
        User user = userService.findByUsername(username);
        
        List<AppointmentDTO> appointments = appointmentService.findByUser(user.getId()).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        log.info("✅ Found {} appointments for user: {}", appointments.size(), username);
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Get appointments by user ID (ADMIN can see all, NORMAL sees own)
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @appointmentController.isCurrentUser(#userId)")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getByUser(@PathVariable Long userId) {
        log.debug("📅 Fetching appointments for userId: {}", userId);
        
        // Verify user exists
        userService.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        List<AppointmentDTO> appointments = appointmentService.findByUser(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        log.info("✅ Found {} appointments for userId: {}", appointments.size(), userId);
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Get appointments by client
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getByClient(@PathVariable Long clientId) {
        List<AppointmentDTO> appointments = appointmentService.findByClient(clientId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Get appointments by property
     */
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getByProperty(@PathVariable Long propertyId) {
        List<AppointmentDTO> appointments = appointmentService.findByProperty(propertyId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Get appointments by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getByStatus(@PathVariable AppointmentStatus status) {
        List<AppointmentDTO> appointments = appointmentService.findByStatus(status).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Get appointments by date range
     */
    @GetMapping("/range")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        
        List<AppointmentDTO> appointments = appointmentService.findByDateRange(start, end).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Get user's appointments in date range
     */
    @GetMapping("/user/{userId}/range")
    @PreAuthorize("hasRole('ADMIN') or @appointmentController.isCurrentUser(#userId)")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getUserAppointmentsByDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        
        List<AppointmentDTO> appointments = appointmentService.findByUserAndDateRange(userId, start, end).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Get upcoming appointments for current user
     */
    @GetMapping("/me/upcoming")
    public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getMyUpcomingAppointments() {
        String username = getCurrentUsername();
        User user = userService.findByUsername(username);
        
        List<AppointmentDTO> appointments = appointmentService.findUpcomingByUser(user.getId()).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    /**
     * Create new appointment
     */
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<AppointmentDTO>> createAppointment(
            @Valid @RequestBody AppointmentCreateRequest request) {
        
        log.debug("📝 Creating appointment for userId: {}", request.getUserId());
        
        // Validate end time is after start time
        if (request.getEndTime().isBefore(request.getStartTime())) {
            log.warn("⚠️ Invalid time range: end time is before start time");
            throw new BadRequestException("End time must be after start time");
        }

        User user = userService.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Appointment appointment = Appointment.builder()
                .user(user)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .notes(request.getNotes())
                .location(request.getLocation())
                .status(request.getStatus() != null ? request.getStatus() : AppointmentStatus.SCHEDULED)
                .title(request.getTitle())
                .build();

        // Set client if provided
        if (request.getClientId() != null) {
            Client client = clientService.findById(request.getClientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + request.getClientId()));
            appointment.setClient(client);
            log.debug("🔗 Linked client: {}", client.getName());
        }

        // Set property if provided
        if (request.getPropertyId() != null) {
            Property property = propertyService.findById(request.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + request.getPropertyId()));
            appointment.setProperty(property);
            log.debug("🏠 Linked property: {}", property.getTitle());
        }

        Appointment saved = appointmentService.save(appointment);
        log.info("✅ Appointment created successfully - ID: {}, User: {}, Time: {}", 
                saved.getId(), user.getUsername(), saved.getStartTime());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(toDTO(saved)));
    }

    /**
     * Update appointment
     */
    @PutMapping("/{id}/update")
    // @PreAuthorize("hasRole('ADMIN') or @appointmentController.isAppointmentOwner(#id)") // TODO: Re-enable after implementing authentication
    public ResponseEntity<ApiResponse<AppointmentDTO>> updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentUpdateRequest request) {
        
        log.debug("📝 Updating appointment - ID: {}", id);
        
        Appointment appointment = appointmentService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));

        // Validate time range if both provided
        if (request.getStartTime() != null && request.getEndTime() != null) {
            if (request.getEndTime().isBefore(request.getStartTime())) {
                log.warn("⚠️ Invalid time range update for appointment: {}", id);
                throw new BadRequestException("End time must be after start time");
            }
        }

        if (request.getStartTime() != null) {
            appointment.setStartTime(request.getStartTime());
        }
        if (request.getEndTime() != null) {
            appointment.setEndTime(request.getEndTime());
        }
        if (request.getNotes() != null) {
            appointment.setNotes(request.getNotes());
        }
        if (request.getLocation() != null) {
            appointment.setLocation(request.getLocation());
        }
        if (request.getStatus() != null) {
            appointment.setStatus(request.getStatus());
            log.debug("🔄 Status updated to: {}", request.getStatus());
        }
        if (request.getTitle() != null) {
            appointment.setTitle(request.getTitle());
        }
        if (request.getClientId() != null) {
            Client client = clientService.findById(request.getClientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + request.getClientId()));
            appointment.setClient(client);
            log.debug("🔗 Client updated to: {}", client.getName());
        }
        if (request.getPropertyId() != null) {
            Property property = propertyService.findById(request.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + request.getPropertyId()));
            appointment.setProperty(property);
            log.debug("🏠 Property updated to: {}", property.getTitle());
        }

        Appointment updated = appointmentService.update(id, appointment);
        log.info("✅ Appointment updated successfully - ID: {}", id);
        return ResponseEntity.ok(ApiResponse.ok(toDTO(updated)));
    }

    /**
     * Delete appointment (soft delete via BaseService)
     */
    @DeleteMapping("/{id}/delete")
    // @PreAuthorize("hasRole('ADMIN') or @appointmentController.isAppointmentOwner(#id)") // TODO: Re-enable after implementing authentication
    public ResponseEntity<ApiResponse<Void>> deleteAppointment(@PathVariable Long id) {
        log.debug("🗑️ Deleting appointment - ID: {}", id);
        
        // Verify appointment exists before deletion
        appointmentService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        
        appointmentService.delete(id);
        log.info("✅ Appointment deleted successfully - ID: {}", id);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    // Helper methods
    private String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    public boolean isCurrentUser(Long userId) {
        String username = getCurrentUsername();
        User user = userService.findByUsername(username);
        return user.getId().equals(userId);
    }

    public boolean isAppointmentOwner(Long appointmentId) {
        String username = getCurrentUsername();
        User user = userService.findByUsername(username);
        Appointment appointment = appointmentService.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return appointment.getUser().getId().equals(user.getId());
    }

    private AppointmentDTO toDTO(Appointment appointment) {
        return AppointmentDTO.builder()
                .id(appointment.getId())
                .userId(appointment.getUser().getId())
                .username(appointment.getUser().getUsername())
                .clientId(appointment.getClient() != null ? appointment.getClient().getId() : null)
                .clientName(appointment.getClient() != null ? appointment.getClient().getName() : null)
                .propertyId(appointment.getProperty() != null ? appointment.getProperty().getId() : null)
                .propertyTitle(appointment.getProperty() != null ? appointment.getProperty().getTitle() : null)
                .startTime(appointment.getStartTime())
                .endTime(appointment.getEndTime())
                .notes(appointment.getNotes())
                .location(appointment.getLocation())
                .status(appointment.getStatus())
                .title(appointment.getTitle())
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .build();
    }
}

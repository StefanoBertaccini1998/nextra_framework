package com.nextra.re.persistence.service;

import com.nextra.core.persistence.service.BaseService;
import com.nextra.re.persistence.model.Appointment;
import com.nextra.re.persistence.model.AppointmentStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentService extends BaseService<Appointment, Long> {

    List<Appointment> findByUser(Long userId);

    List<Appointment> findByClient(Long clientId);

    List<Appointment> findByProperty(Long propertyId);

    List<Appointment> findByStatus(AppointmentStatus status);

    List<Appointment> findByUserAndStatus(Long userId, AppointmentStatus status);

    List<Appointment> findByDateRange(LocalDateTime start, LocalDateTime end);

    List<Appointment> findByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end);

    List<Appointment> findUpcomingByUser(Long userId);

    List<Appointment> findPastByUser(Long userId);
}

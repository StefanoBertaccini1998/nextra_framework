package com.nextra.re.persistence.repository;

import com.nextra.core.persistence.repository.BaseRepository;
import com.nextra.re.persistence.model.Appointment;
import com.nextra.re.persistence.model.AppointmentStatus;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends BaseRepository<Appointment, Long> {

    List<Appointment> findByUserId(Long userId);

    List<Appointment> findByClientId(Long clientId);

    List<Appointment> findByPropertyId(Long propertyId);

    List<Appointment> findByStatus(AppointmentStatus status);

    List<Appointment> findByUserIdAndStatus(Long userId, AppointmentStatus status);

    List<Appointment> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Appointment> findByUserIdAndStartTimeBetween(Long userId, LocalDateTime start, LocalDateTime end);

    List<Appointment> findByUserIdAndStartTimeAfter(Long userId, LocalDateTime startTime);

    List<Appointment> findByUserIdAndStartTimeBefore(Long userId, LocalDateTime startTime);
}

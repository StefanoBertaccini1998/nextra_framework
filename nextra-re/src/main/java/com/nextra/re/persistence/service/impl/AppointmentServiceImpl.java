package com.nextra.re.persistence.service.impl;

import com.nextra.core.persistence.service.impl.BaseServiceImpl;
import com.nextra.re.persistence.model.Appointment;
import com.nextra.re.persistence.model.AppointmentStatus;
import com.nextra.re.persistence.repository.AppointmentRepository;
import com.nextra.re.persistence.service.AppointmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
public class AppointmentServiceImpl extends BaseServiceImpl<Appointment, Long> implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
        this.repository = appointmentRepository;
        log.info("✅ AppointmentServiceImpl initialized");
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findByUser(Long userId) {
        log.debug("📅 Finding appointments for userId: {}", userId);
        return appointmentRepository.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findByClient(Long clientId) {
        log.debug("📅 Finding appointments for clientId: {}", clientId);
        return appointmentRepository.findByClientId(clientId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findByProperty(Long propertyId) {
        log.debug("📅 Finding appointments for propertyId: {}", propertyId);
        return appointmentRepository.findByPropertyId(propertyId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findByStatus(AppointmentStatus status) {
        log.debug("📅 Finding appointments with status: {}", status);
        return appointmentRepository.findByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findByUserAndStatus(Long userId, AppointmentStatus status) {
        log.debug("📅 Finding appointments for userId: {} with status: {}", userId, status);
        return appointmentRepository.findByUserIdAndStatus(userId, status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findByDateRange(LocalDateTime start, LocalDateTime end) {
        log.debug("📅 Finding appointments between {} and {}", start, end);
        return appointmentRepository.findByStartTimeBetween(start, end);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        log.debug("📅 Finding appointments for userId: {} between {} and {}", userId, start, end);
        return appointmentRepository.findByUserIdAndStartTimeBetween(userId, start, end);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findUpcomingByUser(Long userId) {
        log.debug("📅 Finding upcoming appointments for userId: {}", userId);
        List<Appointment> appointments = appointmentRepository.findByUserIdAndStartTimeAfter(userId, LocalDateTime.now());
        log.info("✅ Found {} upcoming appointments for userId: {}", appointments.size(), userId);
        return appointments;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> findPastByUser(Long userId) {
        log.debug("📅 Finding past appointments for userId: {}", userId);
        return appointmentRepository.findByUserIdAndStartTimeBefore(userId, LocalDateTime.now());
    }
}

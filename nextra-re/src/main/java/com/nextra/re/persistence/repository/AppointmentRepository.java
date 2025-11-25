package com.nextra.re.persistence.repository;

import com.nextra.core.persistence.repository.BaseRepository;
import com.nextra.re.persistence.model.Appointment;
import com.nextra.re.persistence.model.AppointmentStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.user LEFT JOIN FETCH a.client LEFT JOIN FETCH a.property WHERE a.startTime BETWEEN :start AND :end")
    List<Appointment> findByStartTimeBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.user LEFT JOIN FETCH a.client LEFT JOIN FETCH a.property WHERE a.user.id = :userId AND a.startTime BETWEEN :start AND :end")
    List<Appointment> findByUserIdAndStartTimeBetween(@Param("userId") Long userId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.user LEFT JOIN FETCH a.client LEFT JOIN FETCH a.property WHERE a.user.id = :userId AND a.startTime > :startTime")
    List<Appointment> findByUserIdAndStartTimeAfter(@Param("userId") Long userId, @Param("startTime") LocalDateTime startTime);

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.user LEFT JOIN FETCH a.client LEFT JOIN FETCH a.property WHERE a.user.id = :userId AND a.startTime < :startTime")
    List<Appointment> findByUserIdAndStartTimeBefore(@Param("userId") Long userId, @Param("startTime") LocalDateTime startTime);
}

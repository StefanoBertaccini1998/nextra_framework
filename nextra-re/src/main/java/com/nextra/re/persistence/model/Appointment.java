package com.nextra.re.persistence.model;

import com.nextra.core.persistence.model.BaseEntity;
import com.nextra.core.security.model.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@SuperBuilder
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointments")
public class Appointment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user; // Owner of the appointment

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    @ToString.Exclude
    private Client client; // Optional

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    @ToString.Exclude
    private Property property; // Optional

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(length = 2000)
    private String notes;

    @Column(length = 500)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status;

    @Column(length = 500)
    private String title;
}

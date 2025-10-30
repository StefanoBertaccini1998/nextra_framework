package com.nextra.core.domain.property;

import com.nextra.core.persistence.model.Auditable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private Double price;
}

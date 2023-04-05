package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class AccidentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private LocalDateTime timeHappened;
    private Boolean wasResponsible;
    private String description;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToOne
    @JoinColumn(name = "driverId")
    private Driver driver;
}

package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Risk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String description;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToMany(mappedBy = "risks")
    private List<Driver> drivers;
}

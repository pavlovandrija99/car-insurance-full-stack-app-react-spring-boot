package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private Integer year;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    private String image;
    @ManyToOne
    @JoinColumn(name = "modelId")
    private Model model;
    @OneToMany(mappedBy = "car")
    private List<Proposal> proposals;
}

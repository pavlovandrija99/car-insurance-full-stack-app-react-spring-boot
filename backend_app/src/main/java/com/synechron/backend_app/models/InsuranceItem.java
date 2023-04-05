package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class InsuranceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String name;
    private Boolean isOptional;
    private Integer franchisePercentage;
    private Double amount;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToMany(mappedBy = "insuranceItem", cascade = CascadeType.ALL)
    private List<Franchise> franchises = new ArrayList<>();
    @ManyToMany(mappedBy = "insuranceItems")
    private List<InsurancePlan> insurancePlans = new ArrayList<>();
}

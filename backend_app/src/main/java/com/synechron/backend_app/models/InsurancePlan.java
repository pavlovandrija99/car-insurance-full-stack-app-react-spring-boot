package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class InsurancePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String name;
    private Boolean isPremium;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToMany
    @JoinTable(
            name = "insurancePlans_insuranceItems",
            joinColumns = @JoinColumn(name = "insurancePlanId"),
            inverseJoinColumns = @JoinColumn(name = "insuranceItemId")
    )
    private List<InsuranceItem> insuranceItems;
    @OneToMany(mappedBy = "insurancePlan")
    private List<Proposal> proposals;
}

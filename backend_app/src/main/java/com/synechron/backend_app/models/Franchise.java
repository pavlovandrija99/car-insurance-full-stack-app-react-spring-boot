package com.synechron.backend_app.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Franchise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Integer percentage;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToOne
    @JoinColumn(name = "insuranceItemId")
    private InsuranceItem insuranceItem;
    @ManyToOne
    @JoinColumn(name = "proposalId")
    private Proposal proposal;
}

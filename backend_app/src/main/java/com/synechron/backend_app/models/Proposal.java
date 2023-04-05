package com.synechron.backend_app.models;

import com.synechron.backend_app.enums.ProposalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Proposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Boolean isValid;
    private LocalDateTime creationDate;
    private ProposalStatus proposalStatus;
    private Double amount;
    private String licenceNum;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToOne
    @JoinColumn(name = "carId")
    private Car car;
    @ManyToOne
    @JoinColumn(name = "insurancePlanId")
    private InsurancePlan insurancePlan;
    @OneToOne
    @JoinColumn(name = "policyId")
    private Policy policy;
    @OneToMany(mappedBy = "proposal")
    private List<Franchise> franchises = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "subscriberId")
    private Subscriber subscriber;
    @ManyToMany
    @JoinTable(
            name = "proposals_drivers",
            joinColumns = @JoinColumn(name = "proposalId"),
            inverseJoinColumns = @JoinColumn(name = "driverId")
    )
    private List<Driver> drivers = new ArrayList<>();

    public void calculateAmount() {
        double amount = 0;
        for (Franchise franchise : franchises)
            amount += franchise.getInsuranceItem().getAmount() * ((double) franchise.getPercentage()/100);

        int riskCount = 0;
        for (Driver driver : drivers) {
            int responsibleAccidents = (int) driver.getAccidentHistories().stream().filter(AccidentHistory::getWasResponsible).count();
            amount *= Math.pow(1.4, responsibleAccidents);
            riskCount += driver.getRisks().size();
        }

        amount *= Math.pow(1.05, riskCount);
        this.amount = amount;
    }
}

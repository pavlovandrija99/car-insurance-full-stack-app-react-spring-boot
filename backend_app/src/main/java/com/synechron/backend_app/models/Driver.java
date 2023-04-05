package com.synechron.backend_app.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Driver extends Person {
    @Column(unique = true, nullable = false)
    private String licenceNum;
    @Column(nullable = false)
    private LocalDateTime licenceObtained;
    //@Column(nullable = false)
    private Integer yearsInsured;
    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private List<AccidentHistory> accidentHistories = new ArrayList<>();
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Driver_Risk",
            joinColumns = @JoinColumn(name = "driverId"),
            inverseJoinColumns = @JoinColumn(name = "riskId")
    )
    private List<Risk> risks = new ArrayList<>();

    @ManyToMany(mappedBy = "drivers")
    private List<Proposal> proposals;

    public Driver(String firstName,
                  String lastName,
                  String jmbg,
                  LocalDateTime birth,
                  Address address,
                  Contact contact,
                  String licenceNum,
                  LocalDateTime licenceObtained) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setJmbg(jmbg);
        this.setBirth(birth);
        this.setAddress(address);
        this.setContact(contact);
        this.licenceNum = licenceNum;
        this.licenceObtained = licenceObtained;
        this.risks = new ArrayList<>();
        this.accidentHistories = new ArrayList<>();
    }
}

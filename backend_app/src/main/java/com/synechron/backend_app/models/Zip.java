package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Zip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private Integer zipNumber;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToMany(mappedBy = "zip")
    private List<Address> addresses;
    @ManyToOne
    @JoinColumn(name = "cityId")
    private City city;
}

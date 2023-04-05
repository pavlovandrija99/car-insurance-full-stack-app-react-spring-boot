package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String street;
    @Column(nullable = false)
    private String streetNumber;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToOne
    @JoinColumn(name = "zipId")
    private Zip zip;
    @ManyToOne
    @JoinColumn(name = "cityId")
    private City city;
}

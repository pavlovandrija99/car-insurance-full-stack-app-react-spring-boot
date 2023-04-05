package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String name;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToMany(mappedBy = "city")
    private List<Address> addresses;
    @OneToMany(mappedBy = "city")
    private List<Zip> zips;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "countryId")
    private Country country;
}

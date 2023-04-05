package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String name;
    @ElementCollection
    private List<Integer> years;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToOne
    @JoinColumn(name = "brandId")
    private Brand brand;
    @OneToMany(mappedBy = "model")
    private List<Car> cars;
}

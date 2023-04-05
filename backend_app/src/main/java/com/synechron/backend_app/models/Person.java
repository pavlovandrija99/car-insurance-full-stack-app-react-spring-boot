package com.synechron.backend_app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(unique = true, nullable = false, length = 13)
    private String jmbg;
    @Column(nullable = false)
    private LocalDateTime birth;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToOne(cascade = CascadeType.PERSIST)
    private Contact contact;
    @OneToOne(cascade = CascadeType.PERSIST)
    private Address address;
}

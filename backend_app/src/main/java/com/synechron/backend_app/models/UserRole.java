package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToMany(mappedBy = "userRole")
    private List<User> users;
}

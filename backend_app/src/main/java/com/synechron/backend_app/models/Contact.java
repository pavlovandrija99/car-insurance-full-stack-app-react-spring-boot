package com.synechron.backend_app.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String homePhone;
    @Column(unique = true)
    private String mobilePhone;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
}

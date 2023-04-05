package com.synechron.backend_app.models;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriberRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(unique = true,nullable = false)
    private String name;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToMany(mappedBy = "subscriberRole")
    private List<Subscriber> subscribers;
}

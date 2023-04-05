package com.synechron.backend_app.models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Subscriber extends Person {
    @ManyToOne
    @JoinColumn(name = "subscriberRoleId")
    private SubscriberRole subscriberRole;
    @OneToMany(mappedBy = "subscriber")
    private List<Proposal> proposals;
}

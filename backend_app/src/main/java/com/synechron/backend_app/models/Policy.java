package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private LocalDateTime dateSigned;
    @Column(nullable = false)
    private LocalDateTime moneyReceivedDate;
    @Column(nullable = false)
    private Double amount;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToOne(mappedBy = "policy")
    private Proposal proposal;
    @OneToOne
    @JoinColumn(name = "paymentId")
    private Payment payment;
}

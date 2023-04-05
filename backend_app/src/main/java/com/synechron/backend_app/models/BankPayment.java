package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class BankPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String bankName;
    @Column(unique = true, nullable = false)
    private String transactionNo;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToOne(mappedBy = "bankPayment")
    private Payment payment;
}

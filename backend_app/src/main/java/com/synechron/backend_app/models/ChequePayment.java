package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class ChequePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(unique = true, nullable = false)
    private String chequeNo;
    @Column(nullable = false)
    private LocalDateTime chequeDate;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @OneToOne(mappedBy = "chequePayment")
    private Payment payment;
}

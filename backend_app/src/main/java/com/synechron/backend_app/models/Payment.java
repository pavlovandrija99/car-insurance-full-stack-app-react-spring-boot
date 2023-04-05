package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @Column
    private LocalDateTime paymentDate;
    @OneToOne(mappedBy = "payment")
    private Policy policy;
    @ManyToOne
    @JoinColumn(name = "paymentModeId")
    private PaymentMode paymentMode;
    @OneToOne
    @JoinColumn(name = "cardPaymentId")
    private CardPayment cardPayment;
    @OneToOne
    @JoinColumn(name = "chequePaymentId")
    private ChequePayment chequePayment;
    @OneToOne
    @JoinColumn(name = "bankPaymentId")
    private BankPayment bankPayment;

    public Object getPayment() {
        switch (paymentMode.getName().toLowerCase()) {
            case "cheque":
                return chequePayment;
            case "card":
                return cardPayment;
            case "bank":
                return bankPayment;
            default:
                return null;
        }
    }
}

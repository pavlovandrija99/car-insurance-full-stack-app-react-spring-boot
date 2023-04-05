package com.synechron.backend_app.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class CardPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String cardHolder;
    @Column(nullable = false)
    private String cardNumber;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "cardTypeId")
    private CardType cardType;

    @OneToOne(mappedBy = "cardPayment")
    private Payment payment;
}

package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.CardPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardPaymentRepository extends JpaRepository<CardPayment, Long> {
}

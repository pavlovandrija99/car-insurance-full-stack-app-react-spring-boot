package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.ChequePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChequePaymentRepository extends JpaRepository<ChequePayment, Long> {
}

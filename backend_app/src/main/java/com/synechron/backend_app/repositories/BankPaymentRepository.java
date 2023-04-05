package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.BankPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankPaymentRepository extends JpaRepository<BankPayment, Long> {
}

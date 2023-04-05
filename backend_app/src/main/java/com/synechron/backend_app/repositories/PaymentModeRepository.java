package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.PaymentMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentModeRepository extends JpaRepository<PaymentMode, Long> {
    @Query(value = "select * from payment_mode where name=:name and is_deleted=false", nativeQuery = true)
    PaymentMode findPaymentModeByName(String name);
}

package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.InsuranceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceItemRepository extends JpaRepository<InsuranceItem, Long> {
}

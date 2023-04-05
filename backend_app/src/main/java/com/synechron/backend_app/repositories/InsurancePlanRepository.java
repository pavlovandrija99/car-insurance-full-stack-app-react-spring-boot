package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.InsurancePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsurancePlanRepository extends JpaRepository<InsurancePlan, Long> {
}

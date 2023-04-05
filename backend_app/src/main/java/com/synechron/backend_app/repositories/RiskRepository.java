package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Risk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskRepository extends JpaRepository<Risk, Long> {
}

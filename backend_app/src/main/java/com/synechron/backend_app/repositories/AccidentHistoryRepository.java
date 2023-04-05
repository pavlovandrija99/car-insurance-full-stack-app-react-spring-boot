package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.AccidentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccidentHistoryRepository extends JpaRepository<AccidentHistory, Long> {
}

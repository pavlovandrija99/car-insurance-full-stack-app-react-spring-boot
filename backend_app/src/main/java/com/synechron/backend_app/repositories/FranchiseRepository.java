package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Franchise;
import com.synechron.backend_app.models.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FranchiseRepository extends JpaRepository<Franchise, Long> {
    List<Franchise> findAllByProposal(Proposal proposal);
}

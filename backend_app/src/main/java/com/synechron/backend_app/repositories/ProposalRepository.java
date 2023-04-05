package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Proposal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {
    @Query(value = "select * from proposal where is_deleted = false", nativeQuery = true)
    Page<Proposal> findAllWhichAreNotDeleted(Pageable pageable);
}

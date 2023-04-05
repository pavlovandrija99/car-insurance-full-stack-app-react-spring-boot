package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Driver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    @Query(value = "select * from driver where jmbg like %:jmbg% and is_deleted = false", nativeQuery = true)
    Page<Driver> findAllByJmbg(String jmbg, Pageable pageable);

    Optional<Driver> findByJmbg(String jmbg);
}

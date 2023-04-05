package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.City;
import com.synechron.backend_app.models.Zip;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ZipRepository extends JpaRepository<Zip, Long> {
    Optional<Zip> findByZipNumber(Integer zipNumber);
    List<Zip> findAllByCity(City city, Sort sort);
}

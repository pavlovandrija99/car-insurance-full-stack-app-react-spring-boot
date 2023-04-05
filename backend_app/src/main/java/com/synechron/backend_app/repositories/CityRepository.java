package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.City;
import com.synechron.backend_app.models.Country;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findByNameAndCountry(String name, Country country);
    List<City> findAllByCountry(Country country, Sort sort);
}

package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    @Query(value = "select * from car where is_deleted = false", nativeQuery = true)
    Page<Car> findAllCars(Pageable pageable);

    @Query(value = "select * from car c inner join model m on (c.model_id = m.id) where m.brand_id = :brandId and c.is_deleted = false",
            countQuery = "select count(*) from car c inner join model m on (c.model_id = m.id) where m.brand_id = :brandId and c.is_deleted = false",
            nativeQuery = true)
    Page<Car> findAllCarsByBrand(long brandId, Pageable pageable);

    @Query(value = "select * from car c inner join model m on (c.model_id = m.id) where m.id = :modelId and m.brand_id = :brandId and c.is_deleted = false",
            countQuery = "select count(*) from car c inner join model m on (c.model_id = m.id) where m.id = :modelId and m.brand_id = :brandId and c.is_deleted = false",
            nativeQuery = true)
    Page<Car> findAllCarsByModel(long brandId, long modelId, Pageable pageable);

    @Query(value = "select * from car c inner join model m on (c.model_id = m.id) " +
                                        "inner join brand b on (m.brand_id = b.id) " +
                                        "where c.year = :year and m.id = :modelId and b.id = :brandId " +
                                        "and c.is_deleted = false",
            countQuery = "select count(*) from car c inner join model m on (c.model_id = m.id) " +
                    "inner join brand b on (m.brand_id = b.id) " +
                    "where c.year = :year and m.id = :modelId and b.id = :brandId " +
                    "and c.is_deleted = false",
            nativeQuery = true)
    Page<Car> findCarByYear(long brandId, long modelId, long year, Pageable pageable);
}

package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    @Query(value = "select * from model m where m.brand_id = :brandId and m.is_deleted = false", nativeQuery = true)
    List<Model> findModelsByBrand(long brandId);
}

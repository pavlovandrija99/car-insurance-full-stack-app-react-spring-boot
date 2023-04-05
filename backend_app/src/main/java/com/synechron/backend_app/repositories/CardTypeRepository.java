package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.CardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CardTypeRepository extends JpaRepository<CardType, Long> {
    @Query(value = "select * from card_type where name=:name and is_deleted = false", nativeQuery = true)
    CardType findCardTypeByName(String name);
}

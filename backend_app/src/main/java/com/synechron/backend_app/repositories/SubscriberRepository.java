package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Subscriber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

   @Query(value = "select * from subscriber where jmbg like %:jmbg% and is_deleted = false", nativeQuery = true)
   Page<Subscriber> findByJmbg(String jmbg, Pageable pageable);
   @Query(value = "select * from subscriber where jmbg=:jmbg", nativeQuery = true)
   Optional<Subscriber> findOneByJmbg(String jmbg);
}

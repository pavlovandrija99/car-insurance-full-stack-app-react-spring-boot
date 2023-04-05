package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.SubscriberRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriberRoleRepository extends JpaRepository<SubscriberRole, Long> {
    Optional<SubscriberRole> findByName(String name);
}

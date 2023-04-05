package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    Optional<Contact> findByMobilePhone(String mobilePhone);
    Optional<Contact> findByEmail(String email);
}

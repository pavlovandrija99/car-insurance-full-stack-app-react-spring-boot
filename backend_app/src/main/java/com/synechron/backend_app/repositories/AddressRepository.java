package com.synechron.backend_app.repositories;

import com.synechron.backend_app.models.Address;
import com.synechron.backend_app.models.Zip;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByZip(Zip zip, Sort sort);
}

package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.AddressDto;
import com.synechron.backend_app.exceptions.ResourceNotFoundException;
import com.synechron.backend_app.mapper.AddressMapper;
import com.synechron.backend_app.models.Zip;
import com.synechron.backend_app.repositories.AddressRepository;
import com.synechron.backend_app.repositories.ZipRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AddressService {
    private AddressRepository addressRepository;
    private ZipRepository zipRepository;
    private AddressMapper addressMapper;

    public AddressService(AddressRepository addressRepository,
                          ZipRepository zipRepository,
                          AddressMapper addressMapper) {
        this.addressRepository = addressRepository;
        this.zipRepository = zipRepository;
        this.addressMapper = addressMapper;
    }

    public List<AddressDto> findAllByZip(Long zipId) {
        Zip zip = zipRepository.findById(zipId)
                .orElseThrow(() -> new ResourceNotFoundException("Zip with id " + zipId + " not found!"));

        List<AddressDto> addressesDto = new ArrayList<>();
        addressRepository.findAllByZip(zip, Sort.by(Sort.Direction.ASC, "street", "streetNumber")).forEach(address -> {
            addressesDto.add(addressMapper.fromEntityToDto(address));
        });

        return addressesDto;
    }
}

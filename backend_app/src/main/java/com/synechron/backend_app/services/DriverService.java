package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.pageable.PageableDto;
import com.synechron.backend_app.mapper.DriverMapper;
import com.synechron.backend_app.models.Driver;
import com.synechron.backend_app.repositories.DriverRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class DriverService {
    private static int PAGE_SIZE = 10;
    private DriverRepository driverRepository;
    private DriverMapper driverMapper;

    public DriverService(DriverRepository driverRepository,
                         DriverMapper driverMapper) {
        this.driverRepository = driverRepository;
        this.driverMapper = driverMapper;
    }

    public PageableDto findAllDriversByJmbg(String jmbg, int page) {
        Page<Driver> drivers;
        if (jmbg.trim().isEmpty())
            drivers = driverRepository.findAll(PageRequest.of(page, PAGE_SIZE));
        else
            drivers = driverRepository.findAllByJmbg(jmbg, PageRequest.of(page, PAGE_SIZE));

        PageableDto driversDto = new PageableDto();
        drivers.forEach(driver -> {
            driversDto.getObjects().add(driverMapper.fromEntityToDto(driver));
        });

        driversDto.setHasNext(drivers.hasNext());
        driversDto.setHasPrevious(drivers.hasPrevious());
        driversDto.setSliceNumber(drivers.getNumber());
        driversDto.setTotalElements(drivers.getTotalElements());
        driversDto.setTotalNumberOfPages(drivers.getTotalPages());

        return driversDto;
    }
}

package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.CountryDto;
import com.synechron.backend_app.mapper.CountryMapper;
import com.synechron.backend_app.repositories.CountryRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountryService {
    private CountryRepository countryRepository;
    private CountryMapper countryMapper;

    public CountryService(CountryRepository countryRepository,
                          CountryMapper countryMapper) {
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
    }

    public List<CountryDto> findAll() {
        List<CountryDto> countriesDto = new ArrayList<>();

        countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name")).forEach(country -> {
            countriesDto.add(countryMapper.fromEntityToDto(country));
        });

        return countriesDto;
    }
}

package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.CityDto;
import com.synechron.backend_app.exceptions.ResourceNotFoundException;
import com.synechron.backend_app.mapper.CityMapper;
import com.synechron.backend_app.models.Country;
import com.synechron.backend_app.repositories.CityRepository;
import com.synechron.backend_app.repositories.CountryRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityService {
    private CityRepository cityRepository;
    private CountryRepository countryRepository;
    private CityMapper cityMapper;

    public CityService(CityRepository cityRepository,
                       CountryRepository countryRepository,
                       CityMapper cityMapper) {
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
        this.cityMapper = cityMapper;
    }

    public List<CityDto> findAllByCountry(Long countryId) {
        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new ResourceNotFoundException("Country with id " + countryId + " not found!"));

        List<CityDto> citiesDto = new ArrayList<>();
        cityRepository.findAllByCountry(country, Sort.by(Sort.Direction.ASC, "name")).forEach(city -> {
            citiesDto.add(cityMapper.fromEntityToDto(city));
        });

        return citiesDto;
    }
}

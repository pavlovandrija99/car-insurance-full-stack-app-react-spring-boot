package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.ZipDto;
import com.synechron.backend_app.exceptions.ResourceNotFoundException;
import com.synechron.backend_app.mapper.ZipMapper;
import com.synechron.backend_app.models.City;
import com.synechron.backend_app.repositories.CityRepository;
import com.synechron.backend_app.repositories.ZipRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ZipService {
    private ZipRepository zipRepository;
    private CityRepository cityRepository;
    private ZipMapper zipMapper;

    public ZipService(ZipRepository zipRepository,
                      CityRepository cityRepository,
                      ZipMapper zipMapper) {
        this.zipRepository = zipRepository;
        this.cityRepository = cityRepository;
        this.zipMapper = zipMapper;
    }

    public List<ZipDto> findAllByCity(Long cityId) {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new ResourceNotFoundException("City with id " + cityId + " not found!"));

        List<ZipDto> zipsDto = new ArrayList<>();
        zipRepository.findAllByCity(city, Sort.by(Sort.Direction.ASC, "zipNumber")).forEach(zip -> {
            zipsDto.add(zipMapper.fromEntityToDto(zip));
        });

        return zipsDto;
    }
}

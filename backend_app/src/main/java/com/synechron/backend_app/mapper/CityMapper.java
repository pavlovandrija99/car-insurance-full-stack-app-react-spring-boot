package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.CityDto;
import com.synechron.backend_app.models.City;
import org.springframework.stereotype.Component;

@Component
public class CityMapper implements BaseMapper<City, CityDto> {
    private CountryMapper countryMapper;

    public CityMapper(CountryMapper countryMapper) {
        this.countryMapper = countryMapper;
    }

    @Override
    public CityDto fromEntityToDto(City e) {
        return CityDto.builder()
                .Id(e.getId())
                .name(e.getName())
                .country(countryMapper.fromEntityToDto(e.getCountry()))
                .build();
    }

    @Override
    public City fromDtoToEntity(CityDto cityDto) {
        return null;
    }
}

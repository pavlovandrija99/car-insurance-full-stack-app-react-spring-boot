package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.CountryDto;
import com.synechron.backend_app.models.Country;
import org.springframework.stereotype.Component;

@Component
public class CountryMapper implements BaseMapper<Country, CountryDto> {
    @Override
    public CountryDto fromEntityToDto(Country e) {
        return CountryDto.builder()
                .Id(e.getId())
                .name(e.getName())
                .build();
    }

    @Override
    public Country fromDtoToEntity(CountryDto countryDto) {
        return null;
    }
}

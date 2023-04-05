package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.ZipDto;
import com.synechron.backend_app.models.Zip;
import org.springframework.stereotype.Component;

@Component
public class ZipMapper implements BaseMapper<Zip, ZipDto> {
    private CityMapper cityMapper;

    public ZipMapper(CityMapper cityMapper) {
        this.cityMapper = cityMapper;
    }

    @Override
    public ZipDto fromEntityToDto(Zip e) {
        return ZipDto.builder()
                .Id(e.getId())
                .zipNumber(e.getZipNumber())
                .city(cityMapper.fromEntityToDto(e.getCity()))
                .build();
    }

    @Override
    public Zip fromDtoToEntity(ZipDto zipDto) {
        return null;
    }
}

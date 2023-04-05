package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.BrandDto;
import com.synechron.backend_app.models.Brand;
import org.springframework.stereotype.Component;

@Component
public class BrandMapper implements BaseMapper<Brand, BrandDto> {

    @Override
    public BrandDto fromEntityToDto(Brand e) {
        return BrandDto.builder()
                .Id(e.getId())
                .name(e.getName())
                .build();
    }

    @Override
    public Brand fromDtoToEntity(BrandDto brandDto) {
        return null;
    }
}

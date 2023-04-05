package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.BrandDto;
import com.synechron.backend_app.dtos.ModelDto;
import com.synechron.backend_app.models.Model;
import org.springframework.stereotype.Component;

@Component
public class ModelMapper implements BaseMapper<Model, ModelDto> {
    @Override
    public ModelDto fromEntityToDto(Model e) {
        return ModelDto.builder()
                .Id(e.getId())
                .name(e.getName())
                .brand(BrandDto.builder()
                        .Id(e.getBrand().getId())
                        .name(e.getBrand().getName())
                        .build())
                .years(e.getYears())
                .build();
    }

    @Override
    public Model fromDtoToEntity(ModelDto modelDto) {
        return null;
    }
}

package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.BrandDto;
import com.synechron.backend_app.dtos.CarDto;
import com.synechron.backend_app.dtos.ModelDto;
import com.synechron.backend_app.models.Car;
import org.springframework.stereotype.Component;

@Component
public class CarMapper implements BaseMapper<Car, CarDto> {
    @Override
    public CarDto fromEntityToDto(Car e) {
        return CarDto.builder()
                .Id(e.getId())
                .year(e.getYear())
                .image(e.getImage())
                .model(ModelDto.builder()
                        .Id(e.getModel().getId())
                        .name(e.getModel().getName())
                        .brand(BrandDto.builder()
                                .Id(e.getModel().getBrand().getId())
                                .name(e.getModel().getBrand().getName())
                                .build())
                        .build())
                .build();
    }

    @Override
    public Car fromDtoToEntity(CarDto carDto) {
        return null;
    }
}

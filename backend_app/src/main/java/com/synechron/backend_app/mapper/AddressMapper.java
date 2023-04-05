package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.AddressDto;
import com.synechron.backend_app.dtos.CityDto;
import com.synechron.backend_app.dtos.ZipDto;
import com.synechron.backend_app.models.Address;
import com.synechron.backend_app.models.Zip;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper implements BaseMapper<Address, AddressDto> {
    private ZipMapper zipMapper;

    public AddressMapper(ZipMapper zipMapper) {
        this.zipMapper = zipMapper;
    }

    @Override
    public AddressDto fromEntityToDto(Address e) {
        return AddressDto.builder()
                .Id(e.getId())
                .street(e.getStreet())
                .streetNumber(e.getStreetNumber())
                .zip(zipMapper.fromEntityToDto(e.getZip()))
                .build();
    }

    @Override
    public Address fromDtoToEntity(AddressDto addressDto) {
        return null;
    }
}

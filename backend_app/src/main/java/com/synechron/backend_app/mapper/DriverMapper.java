package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.*;
import com.synechron.backend_app.models.AccidentHistory;
import com.synechron.backend_app.models.Driver;
import com.synechron.backend_app.models.Risk;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DriverMapper implements BaseMapper<Driver, DriverDto> {
    private RiskMapper riskMapper;
    private AccidentHistoryMapper accidentHistoryMapper;
    private AddressMapper addressMapper;
    private ContactMapper contactMapper;

    public DriverMapper(RiskMapper riskMapper,
                        AccidentHistoryMapper accidentHistoryMapper,
                        AddressMapper addressMapper,
                        ContactMapper contactMapper) {
        this.riskMapper = riskMapper;
        this.accidentHistoryMapper = accidentHistoryMapper;
        this.addressMapper = addressMapper;
        this.contactMapper = contactMapper;
    }

    @Override
    public DriverDto fromEntityToDto(Driver e) {
        List<RiskDto> riskSDto = new ArrayList<>();
        List<AccidentHistoryDto> accidentHistoriesDto = new ArrayList<>();

        e.getRisks().forEach(risk -> {
            riskSDto.add(riskMapper.fromEntityToDto(risk));
        });

        e.getAccidentHistories().forEach(accidentHistory -> {
            accidentHistoriesDto.add(accidentHistoryMapper.fromEntityToDto(accidentHistory));
        });

        return DriverDto.builder()
                .id(e.getId())
                .person(PersonDto.builder()
                        .firstName(e.getFirstName())
                        .lastName(e.getLastName())
                        .jmbg(e.getJmbg())
                        .birth(e.getBirth())
                        .contact(contactMapper.fromEntityToDto(e.getContact()))
                        .address(addressMapper.fromEntityToDto(e.getAddress()))
                        .build())
                .licenceNum(e.getLicenceNum())
                .licenceObtained(e.getLicenceObtained())
                .risks(riskSDto)
                .accidentHistories(accidentHistoriesDto)
                .build();
    }

    @Override
    public Driver fromDtoToEntity(DriverDto driverDto) {
        return null;
    }
}

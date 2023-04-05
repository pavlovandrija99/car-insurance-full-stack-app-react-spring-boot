package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.InsurancePlanDto;
import com.synechron.backend_app.models.InsurancePlan;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class InsurancePlanMapper implements BaseMapper<InsurancePlan, InsurancePlanDto> {
    private InsuranceItemMapper insuranceItemMapper;

    public InsurancePlanMapper(InsuranceItemMapper insuranceItemMapper) {
        this.insuranceItemMapper = insuranceItemMapper;
    }

    @Override
    public InsurancePlanDto fromEntityToDto(InsurancePlan e) {
        InsurancePlanDto dto = InsurancePlanDto.builder()
                .Id(e.getId())
                .name(e.getName())
                .isPremium(e.getIsPremium())
                .insuranceItems(new ArrayList<>())
                .build();

        e.getInsuranceItems().forEach(item -> {
            dto.getInsuranceItems().add(insuranceItemMapper.fromEntityToDto(item));
        });

        return dto;
    }

    @Override
    public InsurancePlan fromDtoToEntity(InsurancePlanDto insurancePlanDto) {
        return null;
    }
}

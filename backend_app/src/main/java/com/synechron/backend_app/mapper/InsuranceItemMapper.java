package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.InsuranceItemDto;
import com.synechron.backend_app.models.InsuranceItem;
import org.springframework.stereotype.Component;

@Component
public class InsuranceItemMapper implements BaseMapper<InsuranceItem, InsuranceItemDto> {
    @Override
    public InsuranceItemDto fromEntityToDto(InsuranceItem e) {
        return InsuranceItemDto.builder()
                .Id(e.getId())
                .name(e.getName())
                .isOptional(e.getIsOptional())
                .franchisePercentage(e.getFranchisePercentage())
                .amount(e.getAmount())
                .build();
    }

    @Override
    public InsuranceItem fromDtoToEntity(InsuranceItemDto insuranceItemDto) {
        return null;
    }
}

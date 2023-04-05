package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.FranchiseDto;
import com.synechron.backend_app.models.Franchise;
import org.springframework.stereotype.Component;

@Component
public class FranchiseMapper implements BaseMapper<Franchise, FranchiseDto> {
    private InsuranceItemMapper insuranceItemMapper;

    public FranchiseMapper(InsuranceItemMapper insuranceItemMapper) {
        this.insuranceItemMapper = insuranceItemMapper;
    }

    @Override
    public FranchiseDto fromEntityToDto(Franchise e) {
        return FranchiseDto.builder()
                .Id(e.getId())
                .percentage(e.getPercentage())
                .insuranceItem(insuranceItemMapper.fromEntityToDto(e.getInsuranceItem()))
                .build();
    }

    @Override
    public Franchise fromDtoToEntity(FranchiseDto franchiseDto) {
        return null;
    }
}

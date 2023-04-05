package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.RiskDto;
import com.synechron.backend_app.models.Risk;
import org.springframework.stereotype.Component;

@Component
public class RiskMapper implements BaseMapper<Risk, RiskDto>{
    @Override
    public RiskDto fromEntityToDto(Risk e) {
        return RiskDto.builder()
                .Id(e.getId())
                .description(e.getDescription())
                .build();
    }

    @Override
    public Risk fromDtoToEntity(RiskDto riskDto) {
        return null;
    }
}

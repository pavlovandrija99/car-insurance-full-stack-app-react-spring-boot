package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.AccidentHistoryDto;
import com.synechron.backend_app.dtos.DriverDto;
import com.synechron.backend_app.models.AccidentHistory;
import org.springframework.stereotype.Component;

@Component
public class AccidentHistoryMapper implements BaseMapper<AccidentHistory, AccidentHistoryDto> {
    @Override
    public AccidentHistoryDto fromEntityToDto(AccidentHistory e) {
        return AccidentHistoryDto.builder()
                .Id(e.getId())
                .timeHappened(e.getTimeHappened())
                .wasResponsible(e.getWasResponsible())
                .description(e.getDescription())
                .build();
    }

    @Override
    public AccidentHistory fromDtoToEntity(AccidentHistoryDto accidentHistoryDto) {
        return null;
    }
}

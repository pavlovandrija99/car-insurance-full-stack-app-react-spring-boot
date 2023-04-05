package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.AccidentHistoryDto;
import com.synechron.backend_app.mapper.AccidentHistoryMapper;
import com.synechron.backend_app.repositories.AccidentHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccidentHistoryService {
    private AccidentHistoryRepository accidentHistoryRepository;
    private AccidentHistoryMapper accidentHistoryMapper;

    public AccidentHistoryService(AccidentHistoryRepository accidentHistoryRepository,
                                  AccidentHistoryMapper accidentHistoryMapper) {
        this.accidentHistoryRepository = accidentHistoryRepository;
        this.accidentHistoryMapper = accidentHistoryMapper;
    }

    public List<AccidentHistoryDto> findAllAccidentHistories() {
        List<AccidentHistoryDto> accidentDtos = new ArrayList<>();
        accidentHistoryRepository.findAll().forEach((accidentHistory) -> {
            accidentDtos.add(accidentHistoryMapper.fromEntityToDto(accidentHistory));
        });
        return accidentDtos;
    }
}

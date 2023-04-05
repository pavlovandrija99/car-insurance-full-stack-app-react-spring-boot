package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.RiskDto;
import com.synechron.backend_app.mapper.RiskMapper;
import com.synechron.backend_app.repositories.RiskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RiskService {
    private RiskRepository riskRepository;
    private RiskMapper riskMapper;

    public RiskService(RiskRepository riskRepository, RiskMapper riskMapper) {
        this.riskRepository = riskRepository;
        this.riskMapper = riskMapper;
    }

    public List<RiskDto> findAllRisks() {
        List<RiskDto> riskDtos = new ArrayList<>();
        riskRepository.findAll().forEach(risk -> {
           riskDtos.add(riskMapper.fromEntityToDto(risk));
        });
        return riskDtos;
    }
}

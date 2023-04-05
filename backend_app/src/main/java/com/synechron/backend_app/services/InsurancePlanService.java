package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.InsurancePlanDto;
import com.synechron.backend_app.mapper.InsurancePlanMapper;
import com.synechron.backend_app.repositories.InsurancePlanRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InsurancePlanService {
    private InsurancePlanRepository insurancePlanRepository;
    private InsurancePlanMapper insurancePlanMapper;

    public InsurancePlanService(InsurancePlanRepository insurancePlanRepository,
                                InsurancePlanMapper insurancePlanMapper) {
        this.insurancePlanRepository = insurancePlanRepository;
        this.insurancePlanMapper = insurancePlanMapper;
    }

    public List<InsurancePlanDto> findAllInsurancePlans() {
        List<InsurancePlanDto> plansDto = new ArrayList<>();

        insurancePlanRepository.findAll().forEach(plan -> {
            if (!plan.getIsDeleted())
                plansDto.add(insurancePlanMapper.fromEntityToDto(plan));
        });

        return plansDto;
    }
}

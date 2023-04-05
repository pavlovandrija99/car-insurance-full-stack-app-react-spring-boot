package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.*;
import com.synechron.backend_app.models.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProposalMapper implements BaseMapper<Proposal, ProposalDto> {
    private SubscriberMapper subscriberMapper;
    private CarMapper carMapper;
    private DriverMapper driverMapper;
    private InsurancePlanMapper insurancePlanMapper;
    private FranchiseMapper franchiseMapper;

    public ProposalMapper(SubscriberMapper subscriberMapper,
                          CarMapper carMapper,
                          DriverMapper driverMapper,
                          InsurancePlanMapper insurancePlanMapper,
                          FranchiseMapper franchiseMapper) {
        this.subscriberMapper = subscriberMapper;
        this.carMapper = carMapper;
        this.driverMapper = driverMapper;
        this.insurancePlanMapper = insurancePlanMapper;
        this.franchiseMapper = franchiseMapper;
    }

    @Override
    public ProposalDto fromEntityToDto(Proposal proposal) {
        ProposalDto dto = ProposalDto.builder()
                .Id(proposal.getId())
                .isValid(proposal.getIsValid())
                .proposalStatus(proposal.getProposalStatus())
                .creationDate(proposal.getCreationDate())
                .amount(proposal.getAmount())
                .build();

        Subscriber subscriber = proposal.getSubscriber();
        if (subscriber != null) {
            dto.setSubscriber(subscriberMapper.fromEntityToDto(subscriber));
        }

        if (proposal.getLicenceNum() != null) {
            dto.setLicenceNum(proposal.getLicenceNum());
        }

        if (proposal.getCar() != null) {
            dto.setCar(carMapper.fromEntityToDto(proposal.getCar()));
        }

        List<DriverDto> driversDto = new ArrayList<>();
        if (proposal.getDrivers() != null) {
            for (Driver driver : proposal.getDrivers()) {
                driversDto.add(driverMapper.fromEntityToDto(driver));
            }

            dto.setDrivers(driversDto);
        }

        if (proposal.getInsurancePlan() != null) {
            dto.setInsurancePlan(insurancePlanMapper.fromEntityToDto(proposal.getInsurancePlan()));
        }

        List<FranchiseDto> franchisesDto = new ArrayList<>();
        if (proposal.getFranchises() != null) {
            for (Franchise franchise : proposal.getFranchises()) {
                franchisesDto.add(franchiseMapper.fromEntityToDto(franchise));
            }
            dto.setFranchises(franchisesDto);
        }

        return dto;
    }

    @Override
    public Proposal fromDtoToEntity(ProposalDto proposalDto) { return null; }
}

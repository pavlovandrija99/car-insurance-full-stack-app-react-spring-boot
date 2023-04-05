package com.synechron.backend_app.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.synechron.backend_app.enums.ProposalStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ProposalDto {
    private Long Id;
    private Boolean isValid;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime creationDate;
    private LocalDateTime proposalPaidAt;
    private ProposalStatus proposalStatus;
    private Double amount;
    private String licenceNum;
    private CarDto car;
    private InsurancePlanDto insurancePlan;
    private SubscriberDto subscriber;
    private List<DriverDto> drivers;
    private List<FranchiseDto> franchises;
}


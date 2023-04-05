package com.synechron.backend_app.dtos;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class InsurancePlanDto {
    private Long Id;
    private String name;
    private Boolean isPremium;
    private List<InsuranceItemDto> insuranceItems;
}


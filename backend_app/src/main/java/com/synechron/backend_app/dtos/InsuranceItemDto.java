package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class InsuranceItemDto {
    private Long Id;
    private String name;
    private Boolean isOptional;
    private Integer franchisePercentage;
    private Double amount;
}


package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class FranchiseDto {
    private Long Id;
    private Integer percentage;
    private InsuranceItemDto insuranceItem;
}


package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class RiskDto {
    private Long Id;
    private String description;
}

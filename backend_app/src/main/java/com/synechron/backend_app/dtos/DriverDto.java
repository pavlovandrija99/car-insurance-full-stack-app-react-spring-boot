package com.synechron.backend_app.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class DriverDto {
    private Long id;
    private PersonDto person;
    private String licenceNum;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDateTime licenceObtained;
    private Integer yearsInsured;
    private List<RiskDto> risks = new ArrayList<>();
    private List<AccidentHistoryDto> accidentHistories = new ArrayList<>();
}


package com.synechron.backend_app.dtos.request;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ExistingDriverDto {
    private Long id;
    private List<Long> risksIds;
    private List<NewAccidentHistoryDto> accidentHistories;
}

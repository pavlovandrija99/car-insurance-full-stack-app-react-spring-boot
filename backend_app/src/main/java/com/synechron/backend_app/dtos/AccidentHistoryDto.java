package com.synechron.backend_app.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class AccidentHistoryDto {
    private Long Id;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime timeHappened;
    private Boolean wasResponsible;
    private String description;
}

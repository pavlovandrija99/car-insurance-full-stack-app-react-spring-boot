package com.synechron.backend_app.dtos.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.synechron.backend_app.mapper.CustomLocalDateTimeDeserializer;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class NewAccidentHistoryDto {
    @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
    private LocalDateTime timeHappened; // Expects "yyyy-MM-dd" argument.
    private Boolean wasResponsible;
    private String description;
}

package com.synechron.backend_app.dtos.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.synechron.backend_app.mapper.CustomLocalDateTimeDeserializer;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class NewDriverDto {
    private String firstName;
    private String lastName;
    private String jmbg;
    @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
    private LocalDateTime birth; // Expects "yyyy-MM-dd" argument.
    private String homePhone;
    private String mobilePhone;
    private String email;
    private Long addressId;
    private String licenceNum;
    @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
    private LocalDateTime licenceObtained; // Expects "yyyy-MM-dd" argument.
    private List<Long> risksIds;
    private List<NewAccidentHistoryDto> accidentHistories;
}

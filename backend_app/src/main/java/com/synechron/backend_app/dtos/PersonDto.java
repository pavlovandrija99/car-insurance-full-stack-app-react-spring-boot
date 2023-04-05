package com.synechron.backend_app.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PersonDto {
    private String firstName;
    private String lastName;
    private String jmbg;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDateTime birth;
    private ContactDto contact;
    private AddressDto address;
}


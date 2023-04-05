package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ContactDto {
    private Long Id;
    private String homePhone;
    private String mobilePhone;
    private String email;
}


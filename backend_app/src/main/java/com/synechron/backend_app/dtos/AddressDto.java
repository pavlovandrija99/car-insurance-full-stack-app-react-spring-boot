package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class AddressDto {
    private Long Id;
    private String street;
    private String streetNumber;
    private ZipDto zip;
}


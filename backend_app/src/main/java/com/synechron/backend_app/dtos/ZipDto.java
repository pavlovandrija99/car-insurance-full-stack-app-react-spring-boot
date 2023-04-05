package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ZipDto {
    private Long Id;
    private Integer zipNumber;
    private CityDto city;
}


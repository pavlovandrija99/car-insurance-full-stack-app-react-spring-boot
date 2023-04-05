package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class CityDto {
    private Long Id;
    private String name;
    private CountryDto country;
}


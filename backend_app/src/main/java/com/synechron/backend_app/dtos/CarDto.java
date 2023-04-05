package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter

public class CarDto {
    private Long Id;
    private Integer year;
    private String image;
    private ModelDto model;
}


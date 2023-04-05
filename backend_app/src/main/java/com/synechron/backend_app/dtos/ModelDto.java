package com.synechron.backend_app.dtos;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ModelDto {
    private Long Id;
    private String name;
    private BrandDto brand;
    private List<Integer> years;
}


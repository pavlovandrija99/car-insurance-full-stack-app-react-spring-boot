package com.synechron.backend_app.utils;

import com.synechron.backend_app.models.Car;
import lombok.Data;

@Data
public class ProposalCar {
    private Car car;
    private String licenceNum;
}

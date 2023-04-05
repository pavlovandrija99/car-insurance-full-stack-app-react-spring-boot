package com.synechron.backend_app.controllers;

import com.synechron.backend_app.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/cars")
public class CarController {

    private CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<?> findAllCars(@RequestParam(defaultValue = "") String brandId,
                                         @RequestParam(defaultValue = "") String modelId,
                                         @RequestParam(defaultValue = "") String year,
                                         @RequestParam(defaultValue = "0") String page) {
        return new ResponseEntity<>(carService.findAllCars(brandId, modelId, year, page), HttpStatus.OK);
    }
}

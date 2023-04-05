package com.synechron.backend_app.controllers;

import com.synechron.backend_app.services.DriverService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/drivers")
public class DriverController {
    private DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<?> findAllDriversByJmbg(@RequestParam(defaultValue = "") String jmbg,
                                                  @RequestParam(defaultValue = "0") int page) {
        return new ResponseEntity<>(driverService.findAllDriversByJmbg(jmbg, page), HttpStatus.OK);
    }
}

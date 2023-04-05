package com.synechron.backend_app.controllers;

import com.synechron.backend_app.services.InsurancePlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/plans")
public class InsurancePlanController {
    private InsurancePlanService insurancePlanService;

    public InsurancePlanController(InsurancePlanService insurancePlanService) {
        this.insurancePlanService = insurancePlanService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<?> findAllInsurancePlans() {
        return new ResponseEntity<>(insurancePlanService.findAllInsurancePlans(), HttpStatus.OK);
    }
}

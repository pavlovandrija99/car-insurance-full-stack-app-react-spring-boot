package com.synechron.backend_app.controllers;

import com.synechron.backend_app.dtos.BrandDto;
import com.synechron.backend_app.services.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/brands")
public class BrandController {

    private BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<List<BrandDto>> findAllBrands() {
        try {
            return new ResponseEntity<>(brandService.findAllBrands(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

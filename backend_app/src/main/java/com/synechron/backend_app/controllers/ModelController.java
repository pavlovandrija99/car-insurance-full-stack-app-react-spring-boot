package com.synechron.backend_app.controllers;

import com.synechron.backend_app.dtos.ModelDto;
import com.synechron.backend_app.services.ModelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/models")
public class ModelController {

    private ModelService modelService;
    public ModelController(ModelService modelService) {
        this.modelService = modelService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<List<ModelDto>> findAllModels(@RequestParam(defaultValue = "") String brand,
                                                        @RequestParam(defaultValue = "") String model) {
        try {
            List<ModelDto> modelDtos = modelService.findAllModels(brand, model);

            return new ResponseEntity<>(modelDtos, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

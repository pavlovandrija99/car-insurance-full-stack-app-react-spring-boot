package com.synechron.backend_app.controllers;

import com.synechron.backend_app.services.ZipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/zips")
public class ZipController {
    private ZipService zipService;

    public ZipController(ZipService zipService) {
        this.zipService = zipService;
    }

    @GetMapping("/city/{cityId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<?> findAllByCity(@PathVariable Long cityId) {
        return new ResponseEntity<>(zipService.findAllByCity(cityId), HttpStatus.OK);
    }
}

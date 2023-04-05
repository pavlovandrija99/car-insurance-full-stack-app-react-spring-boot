package com.synechron.backend_app.controllers;

import com.synechron.backend_app.services.SubscriberRoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/subscriber-roles")
public class SubscriberRoleController {
    private SubscriberRoleService subscriberRoleService;

    public SubscriberRoleController(SubscriberRoleService subscriberRoleService) {
        this.subscriberRoleService = subscriberRoleService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(subscriberRoleService.findAll(), HttpStatus.OK);
    }
}

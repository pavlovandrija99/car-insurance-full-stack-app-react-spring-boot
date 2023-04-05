package com.synechron.backend_app.controllers;

import com.synechron.backend_app.services.AccidentHistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/accident-histories")
public class AccidentHistoryController {
    private AccidentHistoryService accidentHistoryService;

    public AccidentHistoryController(AccidentHistoryService accidentHistoryService) {
        this.accidentHistoryService = accidentHistoryService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<?> findAllAccidentHistories() {
        return new ResponseEntity<>(accidentHistoryService.findAllAccidentHistories(), HttpStatus.OK);
    }
}

package com.synechron.backend_app.controllers;

import com.synechron.backend_app.dtos.pageable.PageableDto;
import com.synechron.backend_app.services.SubscriberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/subscribers")
public class SubscriberController {

    private SubscriberService subscriberService;

    public SubscriberController(SubscriberService subscriberService) {
        this.subscriberService = subscriberService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'AGENT')")
    public ResponseEntity<PageableDto> findSubscriberByJmbg(@RequestParam(defaultValue = "") String jmbg,
                                                            @RequestParam(defaultValue = "0") int page) {
        return new ResponseEntity<>(subscriberService.findSubscriberByJmbg(jmbg, page), HttpStatus.OK);
    }
}

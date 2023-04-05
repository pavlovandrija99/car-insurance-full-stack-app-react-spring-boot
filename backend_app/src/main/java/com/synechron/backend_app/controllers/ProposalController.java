package com.synechron.backend_app.controllers;

import com.synechron.backend_app.dtos.InsurancePlanDto;
import com.synechron.backend_app.dtos.ProposalDto;
import com.synechron.backend_app.dtos.request.AddDriversToProposalDto;
import com.synechron.backend_app.dtos.request.NewSubscriberDto;
import com.synechron.backend_app.dtos.request.PaymentRequestDto;
import com.synechron.backend_app.services.ProposalService;
import com.synechron.backend_app.utils.ProposalCar;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/proposals")
public class ProposalController {
    private ProposalService proposalService;

    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @PatchMapping("/{proposalId}/subscribers/{subscriberId}")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<ProposalDto> addSubscriberToProposal(@PathVariable Long proposalId, @PathVariable Long subscriberId) {
        return new ResponseEntity<>(proposalService.addSubscriberToProposal(subscriberId, proposalId), HttpStatus.OK);
    }

    @GetMapping("/page/{page}")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> findAllProposals(@PathVariable("page") int page) {
        return new ResponseEntity<>(proposalService.findAllProposals(page), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> findProposalById(@PathVariable Long id) {
        return new ResponseEntity<>(proposalService.findProposalById(id), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> initializeNewProposal() {
        return new ResponseEntity<>(proposalService.initializeNewProposal(), HttpStatus.OK);
    }

    @PatchMapping("/{proposalId}/create-and-add-subscriber")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> createNewSubscriberAndAddToProposal(@PathVariable("proposalId") Long proposalId, @Valid @RequestBody NewSubscriberDto subscriber) {
        return new ResponseEntity<>(proposalService.createNewSubscriberAndAddToProposal(proposalId, subscriber), HttpStatus.OK);
    }

    @PatchMapping("/{proposalId}/add-car-to-proposal")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> addCarToProposal(@PathVariable("proposalId") Long proposalId, @RequestBody ProposalCar proposalCar) {
        return new ResponseEntity<>(proposalService.addCarToProposal(proposalId, proposalCar), HttpStatus.OK);
    }

    @PatchMapping("/{proposalId}/add-drivers-to-proposal")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> addDriversToProposal(@PathVariable("proposalId") Long proposalId, @RequestBody AddDriversToProposalDto addDriversToProposalDto) {
        return new ResponseEntity<>(proposalService.addDriversToProposal(proposalId, addDriversToProposalDto), HttpStatus.OK);
    }

    @PatchMapping("/{proposalId}/confirm-proposal")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> confirmProposal(@PathVariable("proposalId") Long proposalId) {
        return new ResponseEntity<>(proposalService.confirmProposal(proposalId), HttpStatus.OK);
    }

    @PatchMapping("/add-plan-to-proposal/{proposalId}")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> addInsurancePlanToProposal(@PathVariable("proposalId") Long proposalId, @RequestBody InsurancePlanDto insurancePlanDto) {
        return new ResponseEntity<>(proposalService.addInsurancePlanToProposal(proposalId, insurancePlanDto), HttpStatus.OK);
    }

    @PostMapping("/generate-report/{proposalId}")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> exportReport(@PathVariable("proposalId") Long proposalId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/pdf");

        return new ResponseEntity<>(proposalService.exportReport(proposalId), headers, HttpStatus.OK);
    }

    @PatchMapping("/pay-proposal/{proposalId}")
    @PreAuthorize("hasAuthority('AGENT')")
    public ResponseEntity<?> payProposal(@PathVariable("proposalId") Long proposalId, @RequestBody PaymentRequestDto paymentRequestDto) {
        return new ResponseEntity<>(proposalService.payProposal(proposalId, paymentRequestDto), HttpStatus.OK);
    }
}

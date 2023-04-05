package com.synechron.backend_app.security;

import com.synechron.backend_app.dtos.TokensDto;
import com.synechron.backend_app.dtos.request.LoginInfoDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {
    private AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokensDto> login(@RequestBody LoginInfoDto dto) {
        return new ResponseEntity<>(authenticationService.login(dto), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return new ResponseEntity<>(authenticationService.logout(), HttpStatus.OK);
    }

    @GetMapping(value = "/myAuthorities", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> myAuthorities() {
        return new ResponseEntity<>(authenticationService.myAuthorities(), HttpStatus.OK);
    }
}

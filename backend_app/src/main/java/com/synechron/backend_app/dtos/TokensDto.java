package com.synechron.backend_app.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokensDto {
    private String accessToken;
    private String refreshToken;
    private String subject;
    private String issuer;
    private List<String> roles;
    private Long expiresIn;
}

package com.synechron.backend_app.dtos.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginInfoDto {
    private String username;
    private String password;
}

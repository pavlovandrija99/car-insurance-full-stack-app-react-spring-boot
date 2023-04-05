package com.synechron.backend_app.security;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.synechron.backend_app.dtos.TokensDto;
import com.synechron.backend_app.dtos.request.LoginInfoDto;
import com.synechron.backend_app.exceptions.CustomizableBadRequestException;
import com.synechron.backend_app.exceptions.CustomizableInternalServerErrorException;
import com.synechron.backend_app.models.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {
    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;

    public AuthenticationService(AuthenticationManager authenticationManager,
                                 JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    public TokensDto login(LoginInfoDto dto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            dto.getUsername(),
                            dto.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            List<String> authorities = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

            String accessToken = jwtTokenUtil.generateAccessToken(user.getUsername(), "", authorities);
            String refreshToken = jwtTokenUtil.generateRefreshToken(user.getUsername(), "");

            return new TokensDto(
                    accessToken,
                    refreshToken,
                    user.getUsername(),
                    "",
                    authorities,
                    jwtTokenUtil.getExpiresIn(accessToken).getTime()
            );
        } catch (AuthenticationException e) {
            e.printStackTrace();
            throw new CustomizableBadRequestException(e.getMessage());
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            throw new CustomizableInternalServerErrorException(e.getMessage());
        }
    }

    public String logout() {
        return "Yet to be implemented!";
    }

    public List<String> myAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        List<String> authorityList = new ArrayList<>();
        authorities.forEach(simpleGrantedAuthority -> {
            System.out.println(simpleGrantedAuthority.getAuthority());
            authorityList.add(simpleGrantedAuthority.getAuthority());
        });

        return authorityList;
    }
}

package com.synechron.backend_app.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class JWTokenAuthenticationFilter extends OncePerRequestFilter {
    private JwtTokenUtil jwtTokenUtil;

    public JWTokenAuthenticationFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = jwtTokenUtil.getToken(authorizationHeader);

        // Delete this printlns later !!!
        System.out.println("Header: " + authorizationHeader);
        System.out.println("Token: " + token);

        try {
            DecodedJWT decodedJWT = jwtTokenUtil.verify(token);

            String username = decodedJWT.getSubject();
            List<String> roles = decodedJWT.getClaim("roles").asList(String.class);

            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            roles.forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role));
            });

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    username, null, authorities
            );
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (IllegalArgumentException | JWTVerificationException | NullPointerException e) {
            e.printStackTrace();
            /* Errors and exceptions related to authentication are handled by
             * RestAuthenticationEntryPoint class which is configured
             * in SecurityConfiguration's configure(HttpSecurity) method */
        }

        filterChain.doFilter(request, response);
    }
}

package com.synechron.backend_app.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Component
public class JwtTokenUtil {
    public final static String SECRET = "topsecret";
    public final static Algorithm ALGORITHM = Algorithm.HMAC256(SECRET.getBytes());
    public final static int ACCESS_TOKEN_MINUTES = 10;
    public final static int REFRESH_TOKEN_MINUTES = 30;

    public String generateAccessToken(String subject, String issuer, List<String> authorities) throws IllegalArgumentException {
        return JWT.create()
                .withSubject(subject)
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_MINUTES * 60 * 1000))
                .withIssuer(issuer)
                .withClaim("roles", authorities)
                .sign(ALGORITHM);
    }

    public String generateRefreshToken(String subject, String issuer) throws IllegalArgumentException {
        return JWT.create()
                .withSubject(subject)
                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_MINUTES * 60 * 1000))
                .withIssuer(issuer)
                .sign(ALGORITHM);
    }

    public DecodedJWT verify(String token) throws IllegalArgumentException, JWTVerificationException {
        JWTVerifier verifier = JWT.require(ALGORITHM).build();
        return verifier.verify(token);
    }

    public String getToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring("Bearer ".length());
        }

        return null;
    }

    public Date getExpiresIn(String token) throws JWTDecodeException {
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getExpiresAt();
    }
}

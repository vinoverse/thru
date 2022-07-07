package com.thru.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.thru.config.auth.PrincipalDetails;
import com.thru.model.Token;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TokenProvider {
    public Token generateTokenDto(Authentication authentication) {
        PrincipalDetails principalDetailis = (PrincipalDetails) authentication.getPrincipal();

        // Hash 암호 방식
        String jwtToken = JWT.create()
                .withSubject(principalDetailis.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", principalDetailis.getUser().getId())
                .withClaim("username", principalDetailis.getUser().getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        Token token = new Token();
        token.setAccessToken(jwtToken);
        token.setGrantType(JwtProperties.TOKEN_PREFIX);

        return token;
    }
}

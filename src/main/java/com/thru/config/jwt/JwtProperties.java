package com.thru.config.jwt;

public interface JwtProperties {
    String SECRET = "vv_thru";
    long EXPIRATION_TIME = 1000 * 60 * 60 * 7;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";

}

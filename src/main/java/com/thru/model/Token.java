package com.thru.model;

import lombok.Data;

@Data
public class Token {
    private String grantType;
    private String accessToken;
}

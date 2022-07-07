package com.thru.controller;

import com.thru.model.Token;
import com.thru.model.User;
import com.thru.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Token login(@RequestBody User user) {
        return authService.login(user);
    }

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("result", authService.signup(user));
        return resultMap;
    }
}

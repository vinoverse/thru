package com.thru.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {

    @GetMapping({"", "/" })
    public String home() {
        return "<h1>Home<h1>";
    }
}

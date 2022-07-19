package com.thru.model;

import lombok.Data;

import java.util.List;

@Data
public class Mail {
    private List<String> toUserList;
    private String subject;
    private String text;
}

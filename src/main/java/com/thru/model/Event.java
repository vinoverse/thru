package com.thru.model;

import lombok.Data;

@Data
public class Event implements EventInterface {
    private long id;
    private long userId;
    private String title;
    private String contractAddress;
    private String info;
}

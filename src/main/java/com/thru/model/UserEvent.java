package com.thru.model;

import lombok.Data;

@Data
public class UserEvent implements EventInterface {
    private long id;
    private String walletAddress;
    private String title;
    private String contractAddress;
    private String info;
}

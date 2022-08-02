package com.thru.model;

import lombok.Data;

@Data
public class TicketSendError {
    private long eventId;
    private String email;
    private int type;
}
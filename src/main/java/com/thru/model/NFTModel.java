package com.thru.model;

import lombok.Data;

@Data
public class NFTModel {
    private String contract;
    private String tokenId;
    private String ownerAddress;
    private String originUrl;
    private String name;
    private String description;
}

package com.thru.service;

import com.thru.model.NFT;

import java.util.List;

public interface NFTService {
    public List<NFT> getNft(String walletAddress);
}

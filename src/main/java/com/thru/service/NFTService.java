package com.thru.service;

import com.thru.model.NFTModel;

import java.util.List;

public interface NFTService {
    public List<NFTModel> getNft(String walletAddress);
}

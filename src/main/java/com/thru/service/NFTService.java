package com.thru.service;

import com.thru.model.NFT;
import com.thru.model.NFTProject;

import java.util.List;
import java.util.Map;

public interface NFTService {
    public List<NFT> getNft(String walletAddress);

    public Map<String, NFTProject> getNftProject(String walletAddress);
}

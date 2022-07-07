package com.thru.controller;

import com.thru.model.NFTModel;
import com.thru.service.NFTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class NFTController {
    @Autowired
    private NFTService nftService;

    @GetMapping("/nfts/{walletAddress}")
    public Map<String, Object> getNFTs(@PathVariable(value = "walletAddress") String walletAddress) {
        Map<String, Object> returnMap = new HashMap<>();
        List<NFTModel> nftList = nftService.getNftsByOpenseaAPI();
        returnMap.put("result", nftList);
        return returnMap;
    }
}

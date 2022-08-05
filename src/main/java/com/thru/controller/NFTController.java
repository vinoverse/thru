package com.thru.controller;

import com.thru.model.Event;
import com.thru.model.NFT;
import com.thru.service.EventService;
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

    @Autowired
    private EventService eventService;

    @GetMapping("/nfts/{walletAddress}")
    public Map<String, Object> getNFTs(@PathVariable(value = "walletAddress") String walletAddress) {
        Map<String, Object> returnMap = new HashMap<>();
        List<NFT> nftList = nftService.getNft(walletAddress);

        Map<String, List<Event>> eventMap = eventService.getEventsByNfts(nftList);

        returnMap.put("nftList", nftList);
        returnMap.put("eventMap", eventMap);
        return returnMap;
    }
}

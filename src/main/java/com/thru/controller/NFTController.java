package com.thru.controller;

import com.thru.config.auth.PrincipalDetails;
import com.thru.model.*;
import com.thru.service.EventService;
import com.thru.service.NFTService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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

        Map<String, List<EventInterface>> eventMap = eventService.getEventsByNfts(nftList);

        returnMap.put("nftList", nftList);
        returnMap.put("eventMap", eventMap);
        return returnMap;
    }

    @GetMapping("/nftProject/{walletAddress}")
    public Map<String, Object> getNFTProject(@PathVariable(value = "walletAddress") String walletAddress) {
        Map<String, Object> returnMap = new HashMap<>();
        Map<String, NFTProject> nftProjectMap = nftService.getNftProject(walletAddress);

        returnMap.put("nftProjectMap", nftProjectMap);
        return returnMap;
    }

    @DeleteMapping("/event")
    public Map<String, String> removeEvent(@RequestHeader Map<String, Object> requestHeader, @RequestBody UserEvent event) {
        Map<String, String> resultMap = new HashMap<>();

        if (requestHeader.containsKey("walletaddress")) {
            String walletAddress = (String) requestHeader.get("walletaddress");
            String resultMessage = eventService.deleteUserEvent(event, walletAddress);
            resultMap.put("result", resultMessage);
        }

        return resultMap;
    }

    @PostMapping("/event")
    public Map<String, String> addEvent(@RequestHeader Map<String, Object> requestHeader, @RequestBody UserEvent event) {
        Map<String, String> resultMap = new HashMap<>();

        if (requestHeader.containsKey("walletaddress")) {
            String walletAddress = (String) requestHeader.get("walletaddress");
            String resultMessage = eventService.addUserEvent(event, walletAddress);
            resultMap.put("result", resultMessage);
        }

        return resultMap;
    }

    @GetMapping("/event/{walletAddress}")
    public Map<String, Object> addEvent(@PathVariable(value = "walletAddress") String walletAddress) {
        Map<String, Object> resultMap = new HashMap<>();

        if (StringUtils.isNotEmpty(walletAddress)) {
            List<UserEvent> userEventList = eventService.getUserEvent(walletAddress);
            resultMap.put("eventList", userEventList);
        }

        return resultMap;
    }
}

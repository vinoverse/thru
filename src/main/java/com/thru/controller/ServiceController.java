package com.thru.controller;

import com.thru.config.auth.PrincipalDetails;
import com.thru.model.Event;
import com.thru.service.EventService;
import com.thru.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class ServiceController {

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private EventService eventService;

    @GetMapping("/participate")
    public Map<String, Object> checkParticipante(Authentication authentication, @RequestParam String conAdr, @RequestParam Long tokenId) {
        Map<String, Object> resultMap = new HashMap<>();
        if (authentication != null) {
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            String resultMessage = participantService.registeParticipation(conAdr, tokenId, principalDetails.getUser());
            resultMap.put("result", resultMessage);
        }

        return resultMap;
    }

    @PostMapping("/event")
    public Map<String, String> addEvent(Authentication authentication, @RequestBody Event event) {
        Map<String, String> resultMap = new HashMap<>();

        if (authentication != null) {
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            String resultMessage = eventService.addEvent(event, principalDetails.getUser());
            resultMap.put("result", resultMessage);
        }

        return resultMap;
    }

}

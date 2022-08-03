package com.thru.controller;

import com.thru.config.auth.PrincipalDetails;
import com.thru.model.Event;
import com.thru.model.TicketSendError;
import com.thru.service.EventService;
import com.thru.service.ParticipantService;
import com.thru.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class ServiceController {

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private EventService eventService;

    @Autowired
    private TicketService ticketService;

    @GetMapping("/participate")
    public Map<String, Object> checkParticipante(Authentication authentication, @RequestParam(value = "conAdr", required = false) String conAdr, @RequestParam(value = "tokenId", required = false) Long tokenId,
                                                 @RequestParam(value = "eventId", required = false) Long eventId, @RequestParam(value = "email", required = false) String email) {
        Map<String, Object> resultMap = new HashMap<>();
        
        if (authentication != null) {
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            String resultMessage = participantService.registeParticipation(conAdr, tokenId, eventId, email, principalDetails.getUser());
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

    @GetMapping("/event")
    public List<Event> getEvents(Authentication authentication) {
        List<Event> events = null;

        if (authentication != null) {
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            events = eventService.getEvents(principalDetails.getUser());
        }

        return events;
    }

    @PostMapping("/sendTicket")
    public Map<String, Integer> sendTicket(@RequestParam("file") MultipartFile file) {
        Map<String, Integer> resultMap = ticketService.sendTicket(file);
        return resultMap;
    }

    @GetMapping("/ticketSendError")
    public List<TicketSendError> getTicketError(Authentication authentication) {
        List<TicketSendError> ticketSendErrors = null;

        if (authentication != null) {
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            ticketSendErrors = ticketService.getTicketSendErrorList(principalDetails.getUser().getId());
        }

        return ticketSendErrors;
    }
}

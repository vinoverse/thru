package com.thru.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thru.mapper.EventMapper;
import com.thru.mapper.ParticipationMapper;
import com.thru.model.Event;
import com.thru.model.NFT;
import com.thru.model.Participation;
import com.thru.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EventService {
    @Autowired
    private EventMapper eventMapper;

    @Transactional(readOnly = false)
    public String addEvent(Event event, User user) {
        String resultMessage = "";

        try {
            event.setUserId(user.getId());
            eventMapper.insert(event);
            resultMessage = "success";
        } catch (Exception e) {
            resultMessage = "error";
        }

        return resultMessage;
    }

    @Transactional(readOnly = true)
    public List<Event> getEvents(User user) {
        List<Event> events = null;

        try {
            events = eventMapper.selectByUserId(user.getId());
        } catch (Exception e) {
            events = null;
        }

        return events;
    }

    @Transactional(readOnly = true)
    public Map<String, List<Event>> getEventsByNfts(List<NFT> nftList) {
        Map<String, List<Event>> eventMap = new HashMap<>();

        try {
            List<String> contractAddressList = new ArrayList<>();
            for (NFT nftItem : nftList) {
                contractAddressList.add(nftItem.getContract());
            }

            if (contractAddressList.size() > 0) {
                List<Event> events = eventMapper.selectByContractAddressList(contractAddressList);

                for (Event eventItem : events) {
                    String contractAddress = eventItem.getContractAddress();

                    if (!eventMap.containsKey(contractAddress)) {
                        List<Event> imsiEventList = new ArrayList<>();
                        eventMap.put(contractAddress, imsiEventList);
                    }

                    eventMap.get(contractAddress).add(eventItem);
                }
            }
        } catch (Exception e) {}

        return eventMap;
    }
}

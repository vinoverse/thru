package com.thru.service;

import com.thru.mapper.EventMapper;
import com.thru.mapper.ParticipationMapper;
import com.thru.model.Event;
import com.thru.model.Participation;
import com.thru.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventMapper eventMapper;

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

    public List<Event> getEvents(User user) {
        List<Event> events = null;

        try {
            events = eventMapper.selectByUserId(user.getId());
        } catch (Exception e) {
            events = null;
        }

        return events;
    }
}

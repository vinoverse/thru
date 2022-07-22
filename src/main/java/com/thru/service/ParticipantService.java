package com.thru.service;

import com.thru.mapper.EventMapper;
import com.thru.mapper.ParticipationMapper;
import com.thru.model.Event;
import com.thru.model.Participation;
import com.thru.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
public class ParticipantService {
    @Autowired
    private EventMapper eventMapper;

    @Autowired
    private ParticipationMapper participationMapper;

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED)
    public String registeParticipation(String contractAddress, Long tokenId, User user) {
        String resultMessage = "등록된 행사가 아닙니다.";

        Event event = eventMapper.selectByContractAddressAndUserId(contractAddress, user.getId());
        
        if (event != null) {
            Long eventId = event.getId();

            Participation participation = participationMapper.selectByEventIdAndTokenId(eventId, tokenId);
            if (participation == null) {
                Participation newParticipation = new Participation();
                newParticipation.setEventId(eventId);
                newParticipation.setTokenId(tokenId);
                newParticipation.setCreateDate(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));

                participationMapper.insert(newParticipation);

                resultMessage = "참여해주셔서 감사합니다.";
            } else {
                resultMessage = "이미 참여했습니다. 참여 시간 : " + participation.getCreateDate();
            }
        }

        return resultMessage;
    }
}

package com.thru.service;

import com.thru.mapper.EventMapper;
import com.thru.mapper.ParticipationMapper;
import com.thru.mapper.ParticipationimsiMapper;
import com.thru.model.Event;
import com.thru.model.Participation;
import com.thru.model.Participationimsi;
import com.thru.model.User;
import org.apache.commons.lang3.StringUtils;
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

    @Autowired
    private ParticipationimsiMapper participationimsiMapper;

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED)
    public String registeParticipation(String contractAddress, Long tokenId, Long eventId, String email, User user) {
        String resultMessage = "등록된 행사가 아닙니다.";

        if (contractAddress != null) {
            Event event = eventMapper.selectByContractAddressAndUserId(contractAddress, user.getId());
            if (event != null) {
                Long initEventId = event.getId();

                if (tokenId != null) {
                    Participation participation = participationMapper.selectByEventIdAndTokenId(initEventId, tokenId);
                    if (participation == null) {
                        Participation newParticipation = new Participation();
                        newParticipation.setEventId(initEventId);
                        newParticipation.setTokenId(tokenId);
                        newParticipation.setCreateDate(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));

                        participationMapper.insert(newParticipation);

                        resultMessage = "참여해주셔서 감사합니다.";
                    } else {
                        resultMessage = "이미 참여했습니다. 참여 시간 : " + participation.getCreateDate();
                    }
                }
            }
        } else if (eventId != null) {
            Event event = eventMapper.selectByIdAndUserId(eventId, user.getId());
            if (event != null) {
                Long initEventId = event.getId();

                if (email != null) {
                    Participationimsi participationimsi = participationimsiMapper.selectByEventIdAndEmail(eventId, email);
                    if (participationimsi == null) {
                        Participationimsi newParticipationimsi = new Participationimsi();
                        newParticipationimsi.setEventId(eventId);
                        newParticipationimsi.setEmail(email);
                        newParticipationimsi.setCreateDate(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));

                        participationimsiMapper.insert(newParticipationimsi);

                        resultMessage = "참여해주셔서 감사합니다.";
                    } else {
                        resultMessage = "이미 참여했습니다. 참여 시간 : " + participationimsi.getCreateDate();
                    }
                }
            }
        }

        return resultMessage;
    }
}

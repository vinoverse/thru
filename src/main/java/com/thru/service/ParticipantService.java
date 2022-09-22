package com.thru.service;

import com.thru.mapper.EventMapper;
import com.thru.mapper.ParticipationForUserMapper;
import com.thru.mapper.ParticipationMapper;
import com.thru.mapper.ParticipationimsiMapper;
import com.thru.model.*;
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
    private ParticipationForUserMapper participationForUserMapper;
    @Autowired
    private ParticipationimsiMapper participationimsiMapper;

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED)
    public String registeParticipation(String contractAddress, Long tokenId, Long eventId, String email, User user) {
        String resultMessage = "ooooooooops!!";

        if (contractAddress != null) {
            Event event = eventMapper.selectByContractAddressAndUserId(eventId, contractAddress, user.getId());

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

                        resultMessage = "Thank you for WAHT-UP!";
                    } else {
                        resultMessage = "You’ve been already WAHTed……………";
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

                        resultMessage = "Thank you for WAHT-UP!";
                    } else {
                        resultMessage = "You’ve been already WAHTed……………";
                    }
                }
            }
        }

        return resultMessage;
    }

    public String registeParticipationForUserEvent(String contractAddress, Long tokenId, Long eventId, String walletAddress) {
        String resultMessage = "ooooooooops!!";

        if (contractAddress != null) {
            UserEvent userEvent = eventMapper.selectUserEventByContractAddressAndWalletAddress(eventId, contractAddress, walletAddress);

            if (userEvent != null) {
                Long initEventId = userEvent.getId();

                if (tokenId != null) {
                    Participation participation = participationForUserMapper.selectByEventIdAndTokenId(initEventId, tokenId);
                    if (participation == null) {
                        Participation newParticipation = new Participation();
                        newParticipation.setEventId(initEventId);
                        newParticipation.setTokenId(tokenId);
                        newParticipation.setCreateDate(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));

                        participationForUserMapper.insert(newParticipation);

                        resultMessage = "Thank you for WAHT-UP!";
                    } else {
                        resultMessage = "You’ve been already WAHTed……………";
                    }
                }
            }
        }

        return resultMessage;
    }
}

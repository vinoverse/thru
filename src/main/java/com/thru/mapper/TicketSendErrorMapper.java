package com.thru.mapper;

import com.thru.model.TicketSendError;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ParticipationErrorMapper {
    @Insert("INSERT INTO ParticipationError(email, type) VALUES(#{email}, #{type})")
    int insert(TicketSendError participationError);
}

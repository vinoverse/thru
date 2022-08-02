package com.thru.mapper;

import com.thru.model.TicketSendError;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TicketSendErrorMapper {
    @Insert("INSERT INTO TicketSendError(event_id, email, type) VALUES(#{eventId}, #{email}, #{type})")
    int insert(TicketSendError ticketSendError);

    @Select("SELECT * FROM TicketSendError WHERE event_id in (SELECT id FROM Event WHERE user_id=#{userId})")
    List<TicketSendError> selectTicketErrorByEventIdList(long userId);
}

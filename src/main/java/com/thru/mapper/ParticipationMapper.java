package com.thru.mapper;

import com.thru.model.Event;
import com.thru.model.Participation;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ParticipationMapper {
    @Select("SELECT * FROM Participation WHERE event_id=#{eventId} AND token_id=#{tokenId}")
    Participation selectByEventIdAndTokenId(@Param("eventId") Long eventId, @Param("tokenId") Long tokenId);

    @Insert("INSERT INTO Participation(event_id, token_id, create_date) VALUES(#{eventId}, #{tokenId}, #{createDate})")
    int insert(Participation participation);
}

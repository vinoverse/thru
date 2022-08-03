package com.thru.mapper;

import com.thru.model.Participationimsi;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ParticipationimsiMapper {
    @Select("SELECT * FROM Participationimsi WHERE event_id=#{eventId} AND email=#{email}")
    Participationimsi selectByEventIdAndEmail(@Param("eventId") Long eventId, @Param("email") String email);

    @Insert("INSERT INTO Participationimsi(event_id, email, create_date) VALUES(#{eventId}, #{email}, #{createDate})")
    int insert(Participationimsi participation);
}

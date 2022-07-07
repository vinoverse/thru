package com.thru.mapper;

import com.thru.model.Event;
import com.thru.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EventMapper {
    @Select("SELECT * FROM Event WHERE contract_address=#{contractAddress} AND user_id=#{userId}")
    Event selectByContractAddressAndUserId(@Param("contractAddress") String contractAddress, @Param("userId") Long userId);

    @Insert("INSERT INTO Event(user_id, title, contract_address) VALUES(#{userId}, #{title}, #{contractAddress})")
    int insert(Event event);
}

package com.thru.mapper;

import com.thru.model.Event;
import com.thru.model.User;
import com.thru.model.UserEvent;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface EventMapper {
    @Select("SELECT * FROM Event WHERE id=#{id} AND contract_address=#{contractAddress} AND user_id=#{userId}")
    Event selectByContractAddressAndUserId(@Param("id") Long id, @Param("contractAddress") String contractAddress, @Param("userId") Long userId);

    @Select("SELECT * FROM Event WHERE user_id=#{userId}")
    List<Event> selectByUserId(@Param("userId") Long userId);

    @Select({"<script>",
            "SELECT *",
            "FROM Event",
            "WHERE contract_address IN",
            "<foreach item='item' index='index' collection='contractAddressList'",
            "open='(' separator=',' close=')'>",
            "#{item}",
            "</foreach>",
            "</script>"})
    List<Event> selectByContractAddressList(@Param("contractAddressList") List contractAddressList);

    @Select("SELECT * FROM Event WHERE id=#{id} AND user_id=#{userId}")
    Event selectByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);

    @Insert("INSERT INTO Event(user_id, title, contract_address, info) VALUES(#{userId}, #{title}, #{contractAddress}, #{info})")
    int insert(Event event);

    @Insert("INSERT INTO UserEvent(wallet_address, title, contract_address, info) VALUES(#{walletAddress}, #{title}, #{contractAddress}, #{info})")
    int insertUserEvent(UserEvent event);

    @Select("SELECT * FROM UserEvent WHERE wallet_address=#{walletAddress}")
    List<UserEvent> selectUserEventByWalletAddress(String walletAddress);
}

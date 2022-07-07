package com.thru.mapper;

import com.thru.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM User WHERE username=#{username}")
    User selectByUsername(@Param("username") String username);

    @Select("SELECT * FROM User WHERE id=#{id}")
    User selectById(@Param("id") long id);

    @Select("SELECT * FROM User WHERE role=#{role} LIMIT #{startPoint}, #{offset}")
    List<User> selectByRole(@Param("role") String role, @Param("startPoint") int startPoint, @Param("offset") int offset);

    @Select("SELECT COUNT(*) FROM User WHERE role=#{role}")
    long selectCountByRole(@Param("role") String role);

    @Update("UPDATE User SET code=#{code} WHERE username=#{username}")
    int updateCodeByUsername(@Param("username") String username, @Param("code") String code);

    @Update("UPDATE User SET password=#{password} WHERE username=#{username}")
    int updatePasswordByusername(@Param("username") String username, @Param("password") String password);

    @Insert("INSERT INTO User(username, password, role, create_date) VALUES(#{username}, #{password}, #{role}, #{createDate})")
    int insert(User user);

    @Update("UPDATE User SET name=#{name}, phone=#{phone} WHERE id=#{id}")
    int updateNameAndPhone(User user);
}

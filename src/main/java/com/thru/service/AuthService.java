package com.thru.service;

import com.thru.config.jwt.TokenProvider;
import com.thru.mapper.UserMapper;
import com.thru.model.Token;
import com.thru.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserMapper userMapper;

    public Token login(User user) {
        Token resultToken = null;

        try {
            UsernamePasswordAuthenticationToken authenticationToken = user.toAuthentication();
            Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
            resultToken = tokenProvider.generateTokenDto(authentication);
        } catch (Exception e) {
            resultToken = null;
        }

        return resultToken;
    }

    @Transactional(readOnly = false)
    public String signup(User user) {
        String resultMessage = "";

        try {
            User userEntity = userMapper.selectByUsername(user.getUsername());

            if (userEntity == null) {
                user.setCreateDate(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));
                user.setRole("ROLE_ADMIN");

                String encodePassword = bCryptPasswordEncoder.encode(user.getPassword());
                user.setPassword(encodePassword);

                userMapper.insert(user);

                resultMessage = "success";
            } else {
                resultMessage = "이미 존재하는 ID 입니다.";
            }
        } catch (Exception e) {
            resultMessage = "회원가입 도중 오류가 발생했습니다.\n 다시 한번 가입 부탁 드립니다.";
        }

        return resultMessage;
    }
}

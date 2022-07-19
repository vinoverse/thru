package com.thru.helper;

import com.thru.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeMessage;

@Component
public class MailHelper {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(Mail mail) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("vinoverse@vanillavoid.com");
        simpleMailMessage.setTo(mail.getToUserList().toArray(new String[mail.getToUserList().size()]));
        simpleMailMessage.setSubject(mail.getSubject());
        simpleMailMessage.setText(mail.getText());
        javaMailSender.send(simpleMailMessage);
    }
}

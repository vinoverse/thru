package com.thru.helper;

import com.thru.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class MailHelper {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(Mail mail) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setSubject(mail.getSubject());
        helper.setText(mail.getText(), true);
        helper.setFrom("vinoverse@vanillavoid.com");
        helper.setTo(mail.getToUserList().toArray(new String[mail.getToUserList().size()]));

        javaMailSender.send(mimeMessage);
    }
}

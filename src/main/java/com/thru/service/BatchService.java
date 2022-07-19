package com.thru.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.thru.helper.MailHelper;
import com.thru.helper.S3UploadHelper;
import com.thru.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class BatchService {
    @Autowired
    private MailHelper mailHelper;

    @Autowired
    private S3UploadHelper s3UploadHelper;

    public boolean sendTicket(String mailReciver, String aa) {
        String savePath = "qrImage";
        File file = new File(savePath);
        //파일 경로가 없으면 파일 생성
        if (!file.exists()) {
            file.mkdirs();
        }

        String imageUrl = "";
        String content = "";

        try {
            //QR 생성
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 100, 100);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            //yyyyMMddHHmmss 형식의 날짜 및 시간 정보 파일명에 추가
            String datetimeStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            String fileName = datetimeStr + "qr";
            //파일 생성
            File temp = new File(savePath + "/" + fileName + ".png");

            //ImageIO를 사용하여 파일쓰기
            ImageIO.write(bufferedImage, "png", temp);

            imageUrl = s3UploadHelper.upload(temp, "VVF");
            temp.delete();

        } catch (IOException | WriterException e) {
            e.printStackTrace();
        }

        if (imageUrl != "") {
            Mail mail = new Mail();
            mail.setSubject("title");

            String emailContent = "<html>" +
                    "<body>" +
                    "" +
                    "<h1>My First Heading</h1>" +
                    "<p>My first paragraph.</p>" +
                    "<img src=\"" + imageUrl + "\" />" +
                    "</body>" +
                    "</html>";

            mail.setText(emailContent);

            mailHelper.sendMail(mail);

            return true;
        }

        return false;
    }
}

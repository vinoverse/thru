package com.thru.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.thru.helper.MailHelper;
import com.thru.helper.S3UploadHelper;
import com.thru.mapper.EventMapper;
import com.thru.mapper.TicketSendErrorMapper;
import com.thru.model.Event;
import com.thru.model.ExcelData;
import com.thru.model.Mail;
import com.thru.model.TicketSendError;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TicketService {
    @Autowired
    private MailHelper mailHelper;

    @Autowired
    private S3UploadHelper s3UploadHelper;

    @Autowired
    private TicketSendErrorMapper ticketSendErrorMapper;

    @Autowired
    private EventMapper eventMapper;

    public Map<String, Integer> sendTicket(MultipartFile file) {
        List<ExcelData> dataList = null;

        Map<String, Integer> resultMap = new HashMap<>();

        int errorCount = 0;
        int successCount = 0;

        try {
            dataList = readExcel(file);
        } catch (Exception e) {
            errorCount = -1;
            e.printStackTrace();
        }

        if (errorCount == 0) {
            if (dataList != null) {
                for (ExcelData excelData : dataList) {
                    String content = "eventId=" + excelData.getEventId() + "&email=" + excelData.getEmail();
                    boolean mailResult = makeQRcodeAndSendToMail(excelData.getEmail(), content);
                    if (mailResult == false) {
                        errorCount++;
                    } else {
                        successCount++;
                    }
                }
            }
        }

        resultMap.put("errorCount", errorCount);
        resultMap.put("successCount", successCount);

        return resultMap;
    }

    private List<ExcelData> readExcel(MultipartFile file) throws Exception {
        List<ExcelData> dataList = new ArrayList<>();

        String extension = FilenameUtils.getExtension(file.getOriginalFilename()); // 3

        if (!extension.equals("xlsx") && !extension.equals("xls")) {
            throw new IOException("엑셀파일만 업로드 해주세요.");
        }

        Workbook workbook = null;

        if (extension.equals("xlsx")) {
            workbook = new XSSFWorkbook(file.getInputStream());
        } else if (extension.equals("xls")) {
            workbook = new HSSFWorkbook(file.getInputStream());
        }

        Sheet worksheet = workbook.getSheetAt(0);

        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) { // 4
            Row row = worksheet.getRow(i);

            ExcelData data = new ExcelData();

            if (row.getCell(0) == null || row.getCell(1) == null) {
                break;
            }

            data.setEventId((long) row.getCell(0).getNumericCellValue());
            data.setEmail(row.getCell(1).getStringCellValue());

            dataList.add(data);
        }

        return dataList;
    }

    private boolean makeQRcodeAndSendToMail(String mailReciver, String qrContent) {
        String savePath = "qrImage";
        File file = new File(savePath);
        //파일 경로가 없으면 파일 생성
        if (!file.exists()) {
            file.mkdirs();
        }

        String imageUrl = "";
        String content = qrContent;

        int errorType = 0;

        try {
            //QR 생성
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 200, 200);
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

        } catch (Exception e) {
            imageUrl = "";
            e.printStackTrace();
            errorType = 1;
        }

        if (imageUrl != "") {
            try {
                Mail mail = new Mail();
                List<String> recieveUser = new ArrayList<>();
                recieveUser.add(mailReciver);
                mail.setToUserList(recieveUser);
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
            } catch(Exception e) {
                e.printStackTrace();
                errorType = 2;
            }
        }

        if (errorType != 0) {
            TicketSendError ticketSendError = new TicketSendError();
            ticketSendError.setEmail(mailReciver);
            ticketSendError.setType(errorType);
            ticketSendErrorMapper.insert(ticketSendError);
            return false;
        }

        return true;
    }

    public List<TicketSendError> getTicketSendErrorList(long userId) {
        return ticketSendErrorMapper.selectTicketErrorByEventIdList(userId);
    }
}

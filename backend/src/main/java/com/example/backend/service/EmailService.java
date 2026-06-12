package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendCredentials(String toEmail, String password) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Account Created Successfully");

        message.setText(
                "Hello,\n\n" +
                "Your account has been created by Admin.\n\n" +
                "Login Credentials:\n" +
                "Email: " + toEmail + "\n" +
                "Password: " + password + "\n\n" +
                "Please login and change your password.\n\n" +
                "Thank you."
        );

        mailSender.send(message);
    }
}
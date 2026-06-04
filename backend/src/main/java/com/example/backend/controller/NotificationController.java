package com.example.backend.controller;

import com.example.backend.entity.NotificationLog;
import com.example.backend.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationRepository repo;

    @GetMapping("/admin")
    public List<NotificationLog> getAdminNotifications() {
        return repo.findAll();
    }
}

package com.example.backend.service;

import com.example.backend.entity.AuditLog;
import com.example.backend.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository repo;

    public void saveLog(
            String admin,
            String action,
            String target,
            String details
    ) {

        AuditLog log = new AuditLog();

        log.setAdmin(admin);
        log.setAction(action);
        log.setTarget(target);
        log.setDetails(details);
        log.setTime(LocalDateTime.now());

        repo.save(log);
    }
}
package com.example.backend.controller;

import com.example.backend.entity.AuditLog;
import com.example.backend.repository.AuditLogRepository;
import com.example.backend.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/audit")
@CrossOrigin(origins = "*")
public class AuditLogController {

    @Autowired
    private AuditLogRepository repo;

    @Autowired
    private AuditLogService service;

    @PostMapping("/save")
    public void save(@RequestBody AuditLog log) {

        service.saveLog(
                log.getAdmin(),
                log.getAction(),
                log.getTarget(),
                log.getDetails()
        );
    }

    @GetMapping("/all")
    public List<AuditLog> getAll() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "time"));
    }

    
    @GetMapping("/test")
    public String test() {

        service.saveLog(
                "Admin",
                "TEST_ACTION",
                "System",
                "Audit Log Working"
        );

        return "Saved Successfully";
    }
}
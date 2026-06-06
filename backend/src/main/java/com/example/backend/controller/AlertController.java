package com.example.backend.controller;

import com.example.backend.entity.Alert;
import com.example.backend.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin("*")
public class AlertController {

    @Autowired
    private AlertService service;

    @PostMapping("/create")
    public Alert createAlert(@RequestBody Alert alert) {
        return service.createAlert(alert);
    }

    @GetMapping
    public List<Alert> getAllAlerts() {
        return service.getAllAlerts();
    }

    @GetMapping("/location/{location}")
    public List<Alert> getByLocation(@PathVariable String location) {
        return service.getByLocation(location);
    }

    @PutMapping("/archive/{id}")
    public Alert archiveAlert(@PathVariable String id) {
        return service.archiveAlert(id);
    }

    
    @DeleteMapping("/{id}")
    public String deleteAlert(@PathVariable String id) {
        service.deleteAlert(id);
        return "Alert deleted successfully";
    }
}
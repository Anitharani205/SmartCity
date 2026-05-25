package com.example.backend.controller;

import com.example.backend.entity.ServiceRequest;
import com.example.backend.service.ServiceRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin("*")
public class ServiceController {

    @Autowired
    private ServiceRequestService service;

    // CREATE SERVICE
    @PostMapping
    public ServiceRequest create(
            @RequestBody ServiceRequest s) {
        return service.save(s);
    }

    // GET ALL
    @GetMapping
    public List<ServiceRequest> getAll() {
        return service.getAll();
    }

    // STAFF TASKS
    @GetMapping("/staff/{email}")
    public List<ServiceRequest> getStaff(
            @PathVariable String email) {
        return service.getByStaff(email);
    }

    @GetMapping("/citizen/{email}")
public List<ServiceRequest> getCitizenServices(
        @PathVariable String email) {

    return service.getCitizenServices(email);
}
    // ASSIGN
    @PutMapping("/assign/{id}")
    public ServiceRequest assign(
            @PathVariable String id,
            @RequestBody ServiceRequest req) {

        return service.assign(id, req);
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public ServiceRequest update(
            @PathVariable String id,
            @RequestBody ServiceRequest req) {

        return service.update(id, req);
    }
}
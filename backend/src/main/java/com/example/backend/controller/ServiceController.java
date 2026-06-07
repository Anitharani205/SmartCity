package com.example.backend.controller;

import com.example.backend.entity.ServiceRequest;
import com.example.backend.service.ServiceRequestService;
import com.example.backend.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin("*")
public class ServiceController {

    @Autowired
    private ServiceRequestService service;

    @Autowired
    private ServiceRepository serviceRepository;

    // CREATE SERVICE
    @PostMapping
    public ServiceRequest create(@RequestBody ServiceRequest s) {
        return service.save(s);
    }

    // GET ALL SERVICES
    @GetMapping
    public List<ServiceRequest> getAll() {
        return service.getAll();
    }

    // GET STAFF SERVICES
    @GetMapping("/staff/{email}")
    public List<ServiceRequest> getStaff(@PathVariable String email) {
        return service.getByStaff(email);
    }

    // GET CITIZEN SERVICES
    @GetMapping("/citizen/{email}")
    public List<ServiceRequest> getCitizenServices(@PathVariable String email) {
        return service.getCitizenServices(email);
    }

    // ASSIGN SERVICE
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

    // FEEDBACK
    @PutMapping("/feedback/{id}")
    public ServiceRequest feedback(
            @PathVariable String id,
            @RequestBody ServiceRequest req) {

        return service.feedback(id, req);
    }

    // DELETE SERVICE (FIXED)
    @DeleteMapping("/{id}")
public void deleteService(@PathVariable String id) {
    serviceRepository.deleteById(id);
}
}
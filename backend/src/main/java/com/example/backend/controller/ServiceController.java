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
@PostMapping
public ServiceRequest create(@RequestBody ServiceRequest s) {
    return service.save(s);
}
  
    @GetMapping
    public List<ServiceRequest> getAll() {
        return service.getAll();
    }

    
    @GetMapping("/staff/{email}")
    public List<ServiceRequest> getStaff(@PathVariable String email) {
        return service.getByStaff(email);
    }

    @GetMapping("/citizen/{email}")
    public List<ServiceRequest> getCitizenServices(@PathVariable String email) {
        return service.getCitizenServices(email);
    }

    @PutMapping("/assign/{id}")
    public ServiceRequest assign(
            @PathVariable String id,
            @RequestBody ServiceRequest req) {

        return service.assign(id, req);
    }

   
    @PutMapping("/{id}/status")
    public ServiceRequest update(
            @PathVariable String id,
            @RequestBody ServiceRequest req) {

        return service.update(id, req);
    }
   @GetMapping("/details/{id}")
public ServiceRequest getServiceById(@PathVariable String id) {
    return service.getServiceById(id);
}

  
    @PutMapping("/feedback/{id}")
    public ServiceRequest feedback(
            @PathVariable String id,
            @RequestBody ServiceRequest req) {

        return service.feedback(id, req);
    }

    
    @DeleteMapping("/{id}")
public void deleteService(@PathVariable String id) {
    serviceRepository.deleteById(id);
}
}
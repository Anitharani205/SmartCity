package com.example.backend.controller;

import com.example.backend.entity.Complaint;
import com.example.backend.entity.NotificationLog;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintService service;

  

    @Autowired
private NotificationRepository notificationRepo;

    @GetMapping
    public List<Complaint> getAll() {
        return service.getAll();
    }

    @GetMapping("/staff/{email}")
    public List<Complaint> getStaff(@PathVariable String email) {
        return service.getByStaff(email);
    }

    @GetMapping("/citizen/{email}")
    public List<Complaint> getCitizenComplaints(@PathVariable String email) {
        return service.getCitizenComplaints(email);
    }
    @GetMapping("/{id}")
public Complaint getComplaintById(@PathVariable String id) {
    return service.getComplaintById(id);
}

    @PostMapping
    public Complaint create(@RequestBody Complaint c) {
        return service.save(c);
    }

    
    @PutMapping("/assign/{id}")
    public Complaint assign(@PathVariable String id, @RequestBody Complaint req) {
        return service.assignTask(id, req);
    }

    @PutMapping("/accept/{id}")
    public Complaint accept(@PathVariable String id, @RequestBody Complaint req) {
        return service.acceptTask(id, req);
    }

    @PutMapping("/{id}/status")
    public Complaint update(@PathVariable String id, @RequestBody Complaint req) {
        return service.updateStatus(id, req);
    }
   @PutMapping("/feedback/{id}")
public Complaint feedback(
        @PathVariable String id,
        @RequestBody Complaint req
) {
    return service.citizenFeedback(id, req);
}
    
    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable String id) {
        service.deleteComplaint(id);
        return "Complaint Deleted Successfully";
    }
}
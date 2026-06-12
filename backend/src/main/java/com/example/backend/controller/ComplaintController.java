package com.example.backend.controller;

import com.example.backend.entity.Complaint;
import com.example.backend.entity.NotificationLog;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.service.ComplaintService;
import com.example.backend.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

@Autowired
private EmailService emailService;
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
public ResponseEntity<?> assign(@PathVariable String id, @RequestBody Complaint req) {

    Complaint updatedComplaint = service.assignTask(id, req);

    try {
        emailService.sendAssignmentEmail(
                req.getAssignedStaffEmail(),
                req.getAssignedStaffName(),
                updatedComplaint.getTitle()
        );
    } catch (Exception e) {
        System.out.println("Email error: " + e.getMessage());
    }

    return ResponseEntity.ok(updatedComplaint);
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
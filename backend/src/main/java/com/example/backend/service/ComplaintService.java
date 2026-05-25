package com.example.backend.service;

import com.example.backend.entity.Complaint;
import com.example.backend.entity.NotificationLog;
import com.example.backend.repository.ComplaintRepository;
import com.example.backend.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository repo;

    @Autowired
    private NotificationRepository notificationRepo;

    public List<Complaint> getAll() {
        return repo.findAll();
    }

    public Complaint save(Complaint c) {
        return repo.save(c);
    }

    public List<Complaint> getByStaff(String email) {
        return repo.findByAssignedStaffEmail(email);
    }
    public List<Complaint> getCitizenComplaints(String citizen) {
    return repo.findByCitizen(citizen);
}
    // ADMIN ASSIGN
    public Complaint assignTask(String id, Complaint req) {
        Complaint c = repo.findById(id).orElseThrow();

        c.setAssignedStaffName(req.getAssignedStaffName());
        c.setAssignedStaffEmail(req.getAssignedStaffEmail());
        c.setStatus("Assigned");

        return repo.save(c);
    }

    // STAFF ACCEPT
    public Complaint acceptTask(String id, Complaint req) {
        Complaint c = repo.findById(id).orElseThrow();

        c.setStatus("Accepted");
        c.setAssignedStaffEmail(req.getAssignedStaffEmail());

        return repo.save(c);
    }

    // STAFF UPDATE + ADMIN NOTIFICATION
    public Complaint updateStatus(String id, Complaint req) {

        Complaint c = repo.findById(id).orElseThrow();

        c.setStatus(req.getStatus());
        c.setProgressNote(req.getProgressNote());
        c.setProofImage(req.getProofImage());

        Complaint updated = repo.save(c);

        if ("Resolved".equals(req.getStatus())) {

            NotificationLog n = new NotificationLog();
            n.setMessage("Complaint '" + c.getTitle() + "' resolved by " + c.getAssignedStaffName());
            n.setRole("ADMIN");
            n.setCreatedAt(java.time.LocalDateTime.now().toString());

            notificationRepo.save(n);
        }

        return updated;
    }
}
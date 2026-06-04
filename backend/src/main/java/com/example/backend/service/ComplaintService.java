package com.example.backend.service;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
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
    @Autowired
private UserRepository userRepo;

    public List<Complaint> getAll() {
        return repo.findAll();
    }

    public Complaint save(Complaint c) {
        return repo.save(c);
    }
    public void deleteComplaint(String id) {

    Complaint c = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    if (!"Resolved".equals(c.getStatus())) {
        throw new RuntimeException("Only resolved complaints can be deleted");
    }

    repo.deleteById(id);
}

    public List<Complaint> getByStaff(String email) {
        return repo.findByAssignedStaffEmail(email);
    }
    public List<Complaint> getCitizenComplaints(String citizen) {
    return repo.findByCitizen(citizen);
}
   
   public Complaint assignTask(String id, Complaint req) {

    Complaint c = repo.findById(id).orElseThrow();

    c.setAssignedStaffName(req.getAssignedStaffName());
    c.setAssignedStaffEmail(req.getAssignedStaffEmail());
    c.setStatus("Assigned");

    User staff =
            userRepo.findByEmail(
                    req.getAssignedStaffEmail()
            );

    if (staff != null) {

        Integer tasks =
                staff.getActiveTasks() == null
                        ? 0
                        : staff.getActiveTasks();

        staff.setActiveTasks(tasks + 1);

        userRepo.save(staff);
    }

    return repo.save(c);
}
    public Complaint acceptTask(String id, Complaint req) {
        Complaint c = repo.findById(id).orElseThrow();

        c.setStatus("Accepted");
        c.setAssignedStaffEmail(req.getAssignedStaffEmail());

        return repo.save(c);
    }

    
    public Complaint updateStatus(String id, Complaint req) {

    Complaint c = repo.findById(id).orElseThrow();

    c.setStatus(req.getStatus());
    c.setProgressNote(req.getProgressNote());
    c.setProofImage(req.getProofImage());

    Complaint updated = repo.save(c);

    if ("Resolved".equals(req.getStatus())) {

        User staff =
                userRepo.findByEmail(
                        c.getAssignedStaffEmail()
                );

        if (staff != null) {

            Integer tasks =
                    staff.getActiveTasks() == null
                            ? 0
                            : staff.getActiveTasks();

            staff.setActiveTasks(
                    Math.max(0, tasks - 1)
            );

            userRepo.save(staff);
        }

        NotificationLog n = new NotificationLog();

        n.setMessage(
                "Complaint '" +
                c.getTitle() +
                "' resolved by " +
                c.getAssignedStaffName()
        );

        n.setRole("ADMIN");

        n.setCreatedAt(
                java.time.LocalDateTime.now()
                        .toString()
        );

        notificationRepo.save(n);
    }

    return updated;
}
}

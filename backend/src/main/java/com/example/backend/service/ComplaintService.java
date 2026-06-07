package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.Complaint;
import com.example.backend.entity.NotificationLog;

import com.example.backend.repository.ComplaintRepository;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.service.AuditLogService;

import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository repo;

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
private AuditLogService auditLogService;

    public List<Complaint> getAll() {
        return repo.findAll();
    }

    public Complaint save(Complaint c) {

    Complaint saved = repo.save(c);

    auditLogService.saveLog(
            "Citizen",
            "CREATE_COMPLAINT",
            saved.getTitle(),
            "Complaint created"
    );

    return saved;
}

    public void deleteComplaint(String id) {

        Complaint c = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        if (!"Resolved".equals(c.getStatus())) {
            throw new RuntimeException("Only resolved complaints can be deleted");
        }

        repo.deleteById(id);
        auditLogService.saveLog(
        "Admin",
        "DELETE_COMPLAINT",
        c.getTitle(),
        "Resolved complaint deleted"
);
    }

    public List<Complaint> getByStaff(String email) {
        return repo.findByAssignedStaffEmail(email);
    }

    public List<Complaint> getCitizenComplaints(String citizen) {
        return repo.findByCitizen(citizen);
    }
    

    public Complaint assignTask(String id, Complaint req) {

    Complaint c = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    c.setAssignedStaffName(req.getAssignedStaffName());
    c.setAssignedStaffEmail(req.getAssignedStaffEmail());
    c.setStatus("ASSIGNED");

    User staff = userRepo.findByEmail(req.getAssignedStaffEmail());

    if (staff != null) {
        Integer tasks = staff.getActiveTasks() == null ? 0 : staff.getActiveTasks();
        staff.setActiveTasks(tasks + 1);
        userRepo.save(staff);
    }

    Complaint updated = repo.save(c);

    // ADMIN LOG
    auditLogService.saveLog(
            "ADMIN",
            "ASSIGN_COMPLAINT",
            c.getTitle(),
            "Assigned to " + c.getAssignedStaffName()
    );

    return updated;
}

    public Complaint acceptTask(String id, Complaint req) {

        Complaint c = repo.findById(id).orElseThrow();

        c.setStatus("Accepted");
        c.setAssignedStaffEmail(req.getAssignedStaffEmail());

        Complaint updated = repo.save(c);

auditLogService.saveLog(
        c.getAssignedStaffName(),
        "ACCEPT_TASK",
        c.getTitle(),
        "Task accepted"
);

return updated;
    }
    public Complaint citizenFeedback(String id, Complaint req) {

    Complaint c = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    c.setCitizenApproval(req.getCitizenApproval());
    c.setCitizenFeedback(req.getCitizenFeedback());

    // ================= APPROVE =================
    if ("APPROVED".equalsIgnoreCase(req.getCitizenApproval())) {

        c.setStatus("CLOSED");

        // STAFF NOTIFICATION
        NotificationLog staff = new NotificationLog();
        staff.setRole("STAFF");
        staff.setStaffEmail(c.getAssignedStaffEmail());
        staff.setMessage("Citizen is satisfied. Complaint '" + c.getTitle() + "' is CLOSED.");
        staff.setComplaintId(c.getId());
        staff.setCreatedAt(java.time.LocalDateTime.now().toString());

        notificationRepo.save(staff);
    }

    // ================= REJECT =================
    if ("REJECTED".equalsIgnoreCase(req.getCitizenApproval())) {

        c.setStatus("REOPENED");

        // ADMIN NOTIFICATION
        NotificationLog admin = new NotificationLog();
        admin.setRole("ADMIN");
        admin.setMessage("Citizen rejected complaint '" + c.getTitle() + "'. Needs reassignment.");
        admin.setComplaintId(c.getId());
        admin.setCreatedAt(java.time.LocalDateTime.now().toString());

        notificationRepo.save(admin);

        // OPTIONAL: reset staff assignment (recycle)
        c.setAssignedStaffEmail(null);
        c.setAssignedStaffName(null);
    }

    return repo.save(c);
}

   
  public Complaint updateStatus(String id, Complaint req) {

    Complaint c = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    String oldStatus = c.getStatus();

    if (req.getStatus() != null) {
        c.setStatus(req.getStatus());
    }

    if (req.getProgressNote() != null) {
        c.setProgressNote(req.getProgressNote());
    }

    if (req.getProofImage() != null) {
        c.setProofImage(req.getProofImage());
    }

    Complaint updated = repo.save(c);

    // ================= ADMIN NOTIFICATION =================
    NotificationLog admin = new NotificationLog();
    admin.setRole("ADMIN");
    admin.setMessage("Complaint '" + c.getTitle() + "' updated by staff. Status: " + c.getStatus());
    admin.setComplaintId(c.getId());
    admin.setCreatedAt(java.time.LocalDateTime.now().toString());

    notificationRepo.save(admin);

    // ================= CITIZEN NOTIFICATION =================
    NotificationLog citizen = new NotificationLog();
    citizen.setRole("CITIZEN");
    citizen.setCitizenEmail(c.getCitizen());
    citizen.setMessage("Your complaint '" + c.getTitle() + "' is now " + c.getStatus());
    citizen.setComplaintId(c.getId());
    citizen.setCreatedAt(java.time.LocalDateTime.now().toString());

    notificationRepo.save(citizen);

    return updated;
}
}
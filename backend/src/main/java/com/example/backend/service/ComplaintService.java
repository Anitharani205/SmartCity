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

        Complaint c = repo.findById(id).orElseThrow();

        c.setAssignedStaffName(req.getAssignedStaffName());
        c.setAssignedStaffEmail(req.getAssignedStaffEmail());
        c.setStatus("Assigned");

        User staff = userRepo.findByEmail(req.getAssignedStaffEmail());

        if (staff != null) {
            Integer tasks = staff.getActiveTasks() == null ? 0 : staff.getActiveTasks();
            staff.setActiveTasks(tasks + 1);
            userRepo.save(staff);
        }

       Complaint updated = repo.save(c);

auditLogService.saveLog(
        "Admin",
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

   
    public Complaint updateStatus(String id, Complaint req) {

    Complaint c = repo.findById(id).orElseThrow();

    // update fields
    c.setStatus(req.getStatus());
    c.setProgressNote(req.getProgressNote());
    c.setProofImage(req.getProofImage());

    Complaint updated = repo.save(c);

    // log
    auditLogService.saveLog(
        c.getAssignedStaffName(),
        "UPDATE_STATUS",
        c.getTitle(),
        "Status changed to " + c.getStatus()
    );

    // ================= ADMIN NOTIFICATION =================
    NotificationLog admin = new NotificationLog();
    admin.setMessage(
        "Complaint '" + c.getTitle() +
        "' updated by staff. Status: " + c.getStatus()
    );
    admin.setRole("ADMIN");
    admin.setCreatedAt(java.time.LocalDateTime.now().toString());
    admin.setProofImage(req.getProofImage());

    notificationRepo.save(admin);

    // ================= CITIZEN NOTIFICATION =================
    NotificationLog citizen = new NotificationLog();
    citizen.setMessage(
        "Your complaint '" + c.getTitle() +
        "' status updated to " + c.getStatus()
    );
    citizen.setRole("CITIZEN");
    citizen.setCitizenEmail(c.getCitizen());
    citizen.setCreatedAt(java.time.LocalDateTime.now().toString());
    citizen.setProofImage(req.getProofImage());

    notificationRepo.save(citizen);

    return updated;
}
}
package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.NotificationLog;
import com.example.backend.entity.ServiceRequest;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRepository repo;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private UserRepository userRepo;

    public List<ServiceRequest> getAll() {
        return repo.findAll();
    }

    public ServiceRequest save(ServiceRequest s) {
        return repo.save(s);
    }

    public List<ServiceRequest> getByStaff(String email) {
        return repo.findByAssignedStaffEmail(email);
    }

    public List<ServiceRequest> getCitizenServices(String citizen) {
        return repo.findByCitizen(citizen);
    }

    public void deleteService(String id) {
        repo.deleteById(id);
    }

    // =========================
    // ASSIGN SERVICE
    // =========================
    public ServiceRequest assign(String id, ServiceRequest req) {

    ServiceRequest s = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found"));

    s.setAssignedStaffName(req.getAssignedStaffName());
    s.setAssignedStaffEmail(req.getAssignedStaffEmail());
    s.setStatus("Assigned");

    return repo.save(s);
}
    // =========================
    // STAFF UPDATE (FIXED NOTIFICATION)
    // =========================
    public ServiceRequest update(String id, ServiceRequest req) {

        ServiceRequest s = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        String oldStatus = s.getStatus();

        if (req.getStatus() != null) {
            s.setStatus(req.getStatus());
        }

        if (req.getProgressNote() != null) {
            s.setProgressNote(req.getProgressNote());
        }

        if (req.getProofImage() != null) {
            s.setProofImage(req.getProofImage());
        }

        ServiceRequest updated = repo.save(s);

        // =========================
        // NOTIFICATION WHEN RESOLVED
        // =========================
        String newStatus = req.getStatus();

        if (newStatus != null &&
                newStatus.equalsIgnoreCase("Resolved") &&
                !"Resolved".equalsIgnoreCase(oldStatus)) {

            // CITIZEN NOTIFICATION
            NotificationLog citizen = new NotificationLog();
            citizen.setMessage("Your service '" + s.getService() + "' is completed");
            citizen.setRole("CITIZEN");
            citizen.setCitizenEmail(s.getCitizen());
            citizen.setServiceId(s.getId());
            citizen.setCreatedAt(java.time.LocalDateTime.now().toString());
            citizen.setProofImage(s.getProofImage());

            notificationRepo.save(citizen);

            // DECREASE STAFF TASK COUNT
            if (s.getAssignedStaffEmail() != null) {
                User staff = userRepo.findByEmail(s.getAssignedStaffEmail());
                if (staff != null && staff.getActiveTasks() != null && staff.getActiveTasks() > 0) {
                    staff.setActiveTasks(staff.getActiveTasks() - 1);
                    userRepo.save(staff);
                }
            }
        }

        return updated;
    }

    // =========================
    // CITIZEN FEEDBACK
    // =========================
    public ServiceRequest feedback(String id, ServiceRequest req) {

        ServiceRequest s = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        if (req.getStatus() != null) {
            s.setStatus(req.getStatus());
        }

        if (req.getProgressNote() != null) {
            s.setProgressNote(req.getProgressNote());
        }

        ServiceRequest updated = repo.save(s);

        auditLogService.saveLog(
                "Citizen",
                "SERVICE_FEEDBACK",
                s.getService(),
                "Citizen marked as " + s.getStatus()
        );

        if ("APPROVED".equalsIgnoreCase(s.getStatus())
                || "REJECTED".equalsIgnoreCase(s.getStatus())) {

            String msg = "Citizen " + s.getCitizen()
                    + " " + s.getStatus()
                    + " service: " + s.getService();

            if (s.getAssignedStaffEmail() != null) {
                NotificationLog staff = new NotificationLog();
                staff.setMessage(msg);
                staff.setRole("STAFF");
                staff.setStaffEmail(s.getAssignedStaffEmail());
                staff.setServiceId(s.getId());
                staff.setCreatedAt(java.time.LocalDateTime.now().toString());

                notificationRepo.save(staff);
            }

            NotificationLog admin = new NotificationLog();
            admin.setMessage(msg);
            admin.setRole("ADMIN");
            admin.setServiceId(s.getId());
            admin.setCreatedAt(java.time.LocalDateTime.now().toString());

            notificationRepo.save(admin);

            NotificationLog citizen = new NotificationLog();
            citizen.setMessage("You " + s.getStatus() + " service: " + s.getService());
            citizen.setRole("CITIZEN");
            citizen.setCitizenEmail(s.getCitizen());
            citizen.setServiceId(s.getId());
            citizen.setCreatedAt(java.time.LocalDateTime.now().toString());

            notificationRepo.save(citizen);
        }

        return updated;
    }
}
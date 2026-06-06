package com.example.backend.service;

import com.example.backend.entity.NotificationLog;
import com.example.backend.entity.ServiceRequest;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.ServiceRepository;

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

    public List<ServiceRequest> getAll() {
        return repo.findAll();
    }

    public ServiceRequest save(ServiceRequest s) {

    ServiceRequest saved = repo.save(s);

    auditLogService.saveLog(
            "Citizen",
            "CREATE_SERVICE",
            saved.getService(),
            "Service request created"
    );

    return saved;
}

    public List<ServiceRequest> getByStaff(String email) {
        return repo.findByAssignedStaffEmail(email);
    }

    public List<ServiceRequest> getCitizenServices(String citizen) {
        return repo.findByCitizen(citizen);
    }

    public ServiceRequest assign(String id, ServiceRequest req) {

        ServiceRequest s = repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));

        s.setAssignedStaffName(req.getAssignedStaffName());
        s.setAssignedStaffEmail(req.getAssignedStaffEmail());
        s.setStatus("Assigned");

       ServiceRequest updated = repo.save(s);

auditLogService.saveLog(
        "Admin",
        "ASSIGN_SERVICE",
        s.getService(),
        "Assigned to " + s.getAssignedStaffName()
);

return updated;
    }

    public ServiceRequest update(String id, ServiceRequest req) {

        ServiceRequest s = repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));

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
        auditLogService.saveLog(
        s.getAssignedStaffName(),
        "UPDATE_SERVICE_STATUS",
        s.getService(),
        "Status changed to " + s.getStatus()
);

        
     if ("Resolved".equalsIgnoreCase(s.getStatus())) {

    NotificationLog admin = new NotificationLog();
    admin.setMessage(
        "Service '" + s.getService() +
        "' completed by " + s.getAssignedStaffName()
    );
    admin.setRole("ADMIN");
    admin.setCreatedAt(java.time.LocalDateTime.now().toString());

    // ✅ PROOF IMAGE
    admin.setProofImage(req.getProofImage());

    notificationRepo.save(admin);

    NotificationLog citizen = new NotificationLog();
    citizen.setMessage(
        "Your service request '" + s.getService() +
        "' has been completed successfully"
    );
    citizen.setRole("CITIZEN");
    citizen.setCitizenEmail(s.getCitizen());
    citizen.setCreatedAt(java.time.LocalDateTime.now().toString());

    // ✅ PROOF IMAGE
    citizen.setProofImage(req.getProofImage());

    notificationRepo.save(citizen);
}

        return updated;
    }
}
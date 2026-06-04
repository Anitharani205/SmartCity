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
    private NotificationRepository notificationRepo;

  
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
    public ServiceRequest assign(String id, ServiceRequest req) {

        ServiceRequest s = repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));

        s.setAssignedStaffName(req.getAssignedStaffName());
        s.setAssignedStaffEmail(req.getAssignedStaffEmail());
        s.setStatus("Assigned");

        return repo.save(s);
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

        
        if ("Resolved".equalsIgnoreCase(s.getStatus())) {

            NotificationLog n = new NotificationLog();

            n.setMessage(
                    "Service '" + s.getService()
                            + "' completed by "
                            + s.getAssignedStaffName()
            );

            n.setRole("ADMIN");

            n.setCreatedAt(
                    java.time.LocalDateTime.now().toString()
            );

            notificationRepo.save(n);
        }

        return updated;
    }
}

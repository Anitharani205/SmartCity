package com.example.backend.service;

import com.example.backend.entity.Alert;
import com.example.backend.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository repo;

    public Alert createAlert(Alert alert) {
        return repo.save(alert);
    }

    public List<Alert> getAllAlerts() {
        return repo.findByStatus("Active");
    }

    public List<Alert> getByLocation(String location) {
        return repo.findByLocation(location);
    }

    public Alert archiveAlert(String id) {
        return repo.findById(id).map(a -> {
            a.setStatus("Archived");
            return repo.save(a);
        }).orElse(null);
    }

    
    public void deleteAlert(String id) {
        repo.deleteById(id);
    }
}
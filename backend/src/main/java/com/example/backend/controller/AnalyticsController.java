package com.example.backend.controller;

import com.example.backend.repository.ComplaintRepository;
import com.example.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private ComplaintRepository repo;

    @Autowired
    private ServiceRepository serviceRepo;

    // =========================
    // COMPLAINT STATS
    // CLOSED ONLY
    // =========================
    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        long total = repo.count();

        long closed = repo.countByStatus("Closed");

        double rate = total == 0
                ? 0
                : (closed * 100.0 / total);

        return Map.of(
                "total", total,
                "closed", closed,
                "rate", rate
        );
    }

    // =========================
    // COMPLAINT CATEGORY WISE
    // =========================
    @GetMapping("/department")
    public Map<String, Long> departmentStats() {

        return repo.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        c -> (c.getCategory() == null || c.getCategory().trim().isEmpty())
                                ? "Unknown"
                                : c.getCategory(),
                        Collectors.counting()
                ));
    }

    // =========================
    // COMPLAINT MONTHLY
    // =========================
    @GetMapping("/monthly")
    public Map<String, Long> monthlyStats() {

        return repo.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        c -> (c.getCreatedAt() == null)
                                ? "Unknown"
                                : c.getCreatedAt().getYear() + "-"
                                + String.format("%02d",
                                c.getCreatedAt().getMonthValue()),
                        Collectors.counting()
                ));
    }

    // =========================
    // SERVICE STATS
    // APPROVED ONLY
    // =========================
   @GetMapping("/service-stats")
public Map<String, Object> serviceStats() {

    long total = serviceRepo.count();

    long approved = serviceRepo.findAll()
            .stream()
            .filter(s -> s.getStatus() != null)
            .filter(s -> s.getStatus().trim().equalsIgnoreCase("APPROVED"))
            .count();

    double rate = total == 0
            ? 0
            : (approved * 100.0 / total);

    return Map.of(
            "total", total,
            "approved", approved,
            "rate", rate
    );
}

    // =========================
    // SERVICE CATEGORY WISE
    // =========================
    @GetMapping("/service-department")
    public Map<String, Long> serviceDepartment() {

        return serviceRepo.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        s -> (s.getCategory() == null || s.getCategory().trim().isEmpty())
                                ? "Unknown"
                                : s.getCategory(),
                        Collectors.counting()
                ));
    }

    // =========================
    // SERVICE MONTHLY
    // =========================
    @GetMapping("/service-monthly")
    public Map<String, Long> serviceMonthly() {

        return serviceRepo.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        s -> (s.getDate() == null)
                                ? "Unknown"
                                : s.getDate().substring(0, 7),
                        Collectors.counting()
                ));
    }
}
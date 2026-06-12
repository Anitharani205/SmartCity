package com.example.backend.controller;

import com.example.backend.repository.ComplaintRepository;
import com.example.backend.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    @Autowired
    private ComplaintRepository repo;

    @Autowired
    private ServiceRepository serviceRepo;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        long totalComplaints = repo.count();

        long closedComplaints = repo.findAll()
                .stream()
                .filter(c -> c.getStatus() != null)
                .filter(c -> c.getStatus().equalsIgnoreCase("Closed"))
                .count();

        double complaintRate =
                totalComplaints == 0
                        ? 0
                        : (closedComplaints * 100.0 / totalComplaints);
Map<String, Long> monthlyComplaints =
        repo.findAll()
                .stream()
                .filter(c -> c.getCreatedAt() != null)
                .collect(Collectors.groupingBy(
                        c -> c.getCreatedAt()
                              .toLocalDate()
                              .toString(),
                        Collectors.counting()
                ));

        long totalServices = serviceRepo.count();

        long approvedServices =
                serviceRepo.findAll()
                        .stream()
                        .filter(s -> s.getStatus() != null)
                        .filter(s -> s.getStatus().equalsIgnoreCase("APPROVED"))
                        .count();

        double serviceRate =
                totalServices == 0
                        ? 0
                        : (approvedServices * 100.0 / totalServices);

        Map<String, Long> serviceDepartment =
                serviceRepo.findAll()
                        .stream()
                        .collect(Collectors.groupingBy(
                                s -> s.getCategory() == null
                                        ? "Unknown"
                                        : s.getCategory(),
                                Collectors.counting()
                        ));

        return Map.of(
                "totalComplaints", totalComplaints,
                "closedComplaints", closedComplaints,
                "complaintRate", complaintRate,
                "monthlyComplaints", monthlyComplaints,

                "totalServices", totalServices,
                "approvedServices", approvedServices,
                "serviceRate", serviceRate,
                "serviceDepartment", serviceDepartment
        );
    }
}
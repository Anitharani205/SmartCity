package com.example.backend.controller;

import com.example.backend.repository.ComplaintRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.entity.Complaint;
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

   
    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        long total = repo.count();
        long resolved = repo.countByStatus("Resolved");

        double rate = total == 0 ? 0 : (resolved * 100.0 / total);

        return Map.of(
                "total", total,
                "resolved", resolved,
                "rate", rate
        );
    }

  
   @GetMapping("/department")
public Map<String, Long> departmentStats() {

    return repo.findAll()
            .stream()
            .collect(Collectors.groupingBy(
                    c -> {
                        if (c.getCategory() == null || c.getCategory().trim().isEmpty()) {
                            return "Unknown";
                        }
                        return c.getCategory();
                    },
                    Collectors.counting()
            ));
}

    
    @GetMapping("/monthly")
public Map<String, Long> monthlyStats() {

    return repo.findAll()
            .stream()
            .collect(Collectors.groupingBy(
                    complaint -> {

                        if (complaint.getCreatedAt() == null) {
                            return "Unknown";
                        }

                        return complaint.getCreatedAt().getYear()
                                + "-"
                                + String.format("%02d",
                                complaint.getCreatedAt().getMonthValue());
                    },
                    Collectors.counting()
            ));
}
@GetMapping("/service-stats")
public Map<String, Object> serviceStats() {

    long total = serviceRepo.count();
    long resolved = serviceRepo.countByStatus("Resolved");

    double rate = total == 0 ? 0 : (resolved * 100.0 / total);

    return Map.of(
            "total", total,
            "resolved", resolved,
            "rate", rate
    );
}
@GetMapping("/service-department")
public Map<String, Long> serviceDepartment() {

    return serviceRepo.findAll()
            .stream()
            .collect(Collectors.groupingBy(
                    s -> s.getCategory() == null ? "Unknown" : s.getCategory(),
                    Collectors.counting()
            ));
}
@GetMapping("/service-monthly")
public Map<String, Long> serviceMonthly() {

    return serviceRepo.findAll()
            .stream()
            .collect(Collectors.groupingBy(
                    s -> s.getDate() == null
                            ? "Unknown"
                            : s.getDate().substring(0, 7),
                    Collectors.counting()
            ));
}
}
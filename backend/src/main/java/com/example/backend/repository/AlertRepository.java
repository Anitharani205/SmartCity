package com.example.backend.repository;

import com.example.backend.entity.Alert;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AlertRepository extends MongoRepository<Alert, String> {
    List<Alert> findByLocation(String location);
    List<Alert> findByStatus(String status);
}
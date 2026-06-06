package com.example.backend.repository;

import com.example.backend.entity.NotificationLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<NotificationLog, String> {

    List<NotificationLog> findByCitizenEmail(String citizenEmail);

    List<NotificationLog> findByRole(String role);
}
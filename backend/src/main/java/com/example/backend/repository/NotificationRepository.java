package com.example.backend.repository;

import com.example.backend.entity.NotificationLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<NotificationLog, String> {
}
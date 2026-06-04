package com.example.backend.repository;

import com.example.backend.entity.ServiceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ServiceRepository
        extends MongoRepository<ServiceRequest, String> {

    List<ServiceRequest> findByAssignedStaffEmail(String email);

    List<ServiceRequest> findByCitizen(String citizen);
}

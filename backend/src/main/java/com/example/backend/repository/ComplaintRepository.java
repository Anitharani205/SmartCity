package com.example.backend.repository;

import com.example.backend.entity.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ComplaintRepository
        extends MongoRepository<Complaint, String> {

    List<Complaint> findByAssignedStaffEmail(String email);

    List<Complaint> findByCitizen(String citizen);
}
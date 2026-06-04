package com.example.backend.repository;

import com.example.backend.entity.Aadhaar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AadhaarRepository
        extends JpaRepository<Aadhaar, Long> {

    Aadhaar findByAadhaarNumber(String aadhaarNumber);
}

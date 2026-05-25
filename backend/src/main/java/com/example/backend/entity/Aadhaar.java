package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "aadhaar")
public class Aadhaar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String aadhaarNumber;

    private String status;

    public Aadhaar() {
    }

    public Long getId() {
        return id;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
package com.example.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "complaints")
public class Complaint {

    @Id
    private String id;

    private String title;
    private String citizen;
    private String location;
    private String status = "Pending";

    private String assignedStaffName;
    private String assignedStaffEmail;

    private String progressNote;
    private String proofImage;

    // getters & setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCitizen() { return citizen; }
    public void setCitizen(String citizen) { this.citizen = citizen; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAssignedStaffName() { return assignedStaffName; }
    public void setAssignedStaffName(String assignedStaffName) {
        this.assignedStaffName = assignedStaffName;
    }

    public String getAssignedStaffEmail() { return assignedStaffEmail; }
    public void setAssignedStaffEmail(String assignedStaffEmail) {
        this.assignedStaffEmail = assignedStaffEmail;
    }

    public String getProgressNote() { return progressNote; }
    public void setProgressNote(String progressNote) {
        this.progressNote = progressNote;
    }

    public String getProofImage() { return proofImage; }
    public void setProofImage(String proofImage) {
        this.proofImage = proofImage;
    }
}
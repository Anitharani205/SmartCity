package com.example.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class NotificationLog {

    @Id
    private String id;

    private String message;
    private String role;        

    private String citizenEmail; 

    private String createdAt;
    private String proofImage;
    private String complaintId;
    private String serviceId;
private String staffEmail;

    public String getId() { return id; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCitizenEmail() { return citizenEmail; }
    public void setCitizenEmail(String citizenEmail) { this.citizenEmail = citizenEmail; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public String getProofImage() {
    return proofImage;
}

public void setProofImage(String proofImage) {
    this.proofImage = proofImage;
}
public String getComplaintId() {
    return complaintId;
}

public void setComplaintId(String complaintId) {
    this.complaintId = complaintId;
}

public String getStaffEmail() {
    return staffEmail;
}

public void setStaffEmail(String staffEmail) {
    this.staffEmail = staffEmail;
}
public String getServiceId() {
    return serviceId;
}

public void setServiceId(String serviceId) {
    this.serviceId = serviceId;
}
}
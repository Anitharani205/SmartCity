package com.example.backend.entity;
import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "complaints")
public class Complaint {

    @Id
    private String id;

    private String title;
    private String description;
    private String category;
    private String priority;

    
    private String citizenName;
    private String citizen;
    private String address;
    private String mapLink;
private String image;
    private String location;

    private String status = "Pending";

    private String assignedStaffName;
    private String assignedStaffEmail;
    private Integer activeTasks = 0;

    private String progressNote;
    private String proofImage;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String citizenFeedback;
private String citizenApproval;
   private Double latitude;
private Double longitude;

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCitizenName() {
        return citizenName;
    }

    public void setCitizenName(String citizenName) {
        this.citizenName = citizenName;
    }

    public String getCitizen() {
        return citizen;
    }

    public void setCitizen(String citizen) {
        this.citizen = citizen;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMapLink() {
        return mapLink;
    }

    public void setMapLink(String mapLink) {
        this.mapLink = mapLink;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAssignedStaffName() {
        return assignedStaffName;
    }

    public void setAssignedStaffName(String assignedStaffName) {
        this.assignedStaffName = assignedStaffName;
    }

    public String getAssignedStaffEmail() {
        return assignedStaffEmail;
    }

    public void setAssignedStaffEmail(String assignedStaffEmail) {
        this.assignedStaffEmail = assignedStaffEmail;
    }
    public Integer getActiveTasks() {
    return activeTasks;
}

public void setActiveTasks(Integer activeTasks) {
    this.activeTasks = activeTasks;
}
    public String getProgressNote() {
        return progressNote;
    }

    public void setProgressNote(String progressNote) {
        this.progressNote = progressNote;
    }

    public String getProofImage() {
        return proofImage;
    }

    public void setProofImage(String proofImage) {
        this.proofImage = proofImage;
    }
    public LocalDateTime getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
}
public String getCitizenFeedback() {
    return citizenFeedback;
}

public void setCitizenFeedback(String citizenFeedback) {
    this.citizenFeedback = citizenFeedback;
}

public String getCitizenApproval() {
    return citizenApproval;
}

public void setCitizenApproval(String citizenApproval) {
    this.citizenApproval = citizenApproval;
}
  public Double getLatitude() {
    return latitude;
}

public void setLatitude(Double latitude) {
    this.latitude = latitude;
}

public Double getLongitude() {
    return longitude;
}

public void setLongitude(Double longitude) {
    this.longitude = longitude;
}
public String getImage() {
    return image;
}

public void setImage(String image) {
    this.image = image;
}
}
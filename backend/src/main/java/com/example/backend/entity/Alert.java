package com.example.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "alerts")
public class Alert {

    @Id
    private String id;

    private String title;
    private String message;

    private String category;
    private String priority;

    private String location;

   
    private String image;

    private String status = "Active";
    private String createdBy;
    private Date createdAt = new Date();

    public Alert() {}

    public Alert(String title, String message, String category,
                 String priority, String location, String image, String createdBy) {
        this.title = title;
        this.message = message;
        this.category = category;
        this.priority = priority;
        this.location = location;
        this.image = image;
        this.createdBy = createdBy;
        this.createdAt = new Date();
        this.status = "Active";
    }

  

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
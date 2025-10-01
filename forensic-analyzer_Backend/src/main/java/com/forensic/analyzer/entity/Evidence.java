package com.forensic.analyzer.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Evidence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String type;
    private String hash;
    private String uploadedBy;
    private LocalDateTime timestamp;

    public boolean isTampered() {
        return tampered;
    }

    public void setTampered(boolean tampered) {
        this.tampered = tampered;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private boolean tampered = false; // ✅ track tampering status

    // Getters and Setters
    public Long getId() { return id; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getHash() { return hash; }
    public void setHash(String hash) { this.hash = hash; }
    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}

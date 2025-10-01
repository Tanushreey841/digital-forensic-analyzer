// Class: EvidenceResponse
package com.forensic.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EvidenceResponse {
    private Long id;
    private String fileName;
    private String fileType;
    private String uploadedBy;
    private LocalDateTime timestamp;
}

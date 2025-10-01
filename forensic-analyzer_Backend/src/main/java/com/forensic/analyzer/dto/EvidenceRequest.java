// Class: EvidenceRequest
package com.forensic.analyzer.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class EvidenceRequest {
    private MultipartFile file;
}

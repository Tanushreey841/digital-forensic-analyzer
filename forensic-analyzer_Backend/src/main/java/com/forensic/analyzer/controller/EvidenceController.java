package com.forensic.analyzer.controller;

import com.forensic.analyzer.entity.Evidence;
import com.forensic.analyzer.service.EvidenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.forensic.analyzer.dto.EvidenceResponse;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/evidence")
public class EvidenceController {

    @Autowired
    private EvidenceService evidenceService;

    // ===================== Upload Evidence =====================
    @PreAuthorize("hasRole('INVESTIGATOR')")
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadEvidence(@RequestParam("file") MultipartFile file,
                                                              Principal principal) {
        try {
            evidenceService.saveEvidence(file, principal.getName());
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "File uploaded successfully"
            ));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "File upload failed: " + e.getMessage()
            ));
        }
    }

    // ===================== List All Evidence (Admin only) =====================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Evidence>> getAllEvidence() {
        return ResponseEntity.ok(evidenceService.getAllEvidence());
    }

    // ===================== List Evidence by Current User =====================
    @PreAuthorize("hasAnyRole('ADMIN','INVESTIGATOR','VIEWER')")
    @GetMapping("/my")
    public ResponseEntity<List<Evidence>> getMyEvidence(Principal principal) {
        return ResponseEntity.ok(evidenceService.getEvidenceByUser(principal.getName()));
    }

    // ===================== Verify Evidence =====================
    @PreAuthorize("hasRole('INVESTIGATOR')")
    @PostMapping("/{id}/verify")
    public ResponseEntity<Map<String, String>> verifyEvidence(@PathVariable Long id,
                                                              @RequestParam("file") MultipartFile file,
                                                              Principal principal) {
        try {
            boolean valid = evidenceService.verifyEvidence(id, file, principal.getName());
            if (valid) {
                return ResponseEntity.ok(Map.of(
                        "status", "success",
                        "message", "Evidence verified: VALID"
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                        "status", "error",
                        "message", "Evidence verification failed: TAMPERED"
                ));
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Evidence verification failed: " + e.getMessage()
            ));
        }
    }

    // ===================== List all evidence (read-only for viewers) =====================
    @PreAuthorize("hasRole('VIEWER')")
    @GetMapping("/viewer")
    public ResponseEntity<List<EvidenceResponse>> getEvidenceForViewer() {
        List<Evidence> allEvidence = evidenceService.getAllEvidence();

        // Map to DTO to avoid exposing sensitive info like hash
        List<EvidenceResponse> response = allEvidence.stream()
                .map(ev -> new EvidenceResponse(
                        ev.getId(),
                        ev.getFileName(),
                        ev.getType(),
                        ev.getUploadedBy(),
                        ev.getTimestamp()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }


    // ===================== Delete Evidence =====================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteEvidence(@PathVariable Long id, Principal principal) {
        evidenceService.deleteEvidence(id, principal.getName());
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Evidence deleted successfully"
        ));
    }
}

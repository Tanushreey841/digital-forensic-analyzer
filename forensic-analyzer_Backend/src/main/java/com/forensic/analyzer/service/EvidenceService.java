package com.forensic.analyzer.service;

import com.forensic.analyzer.entity.Evidence;
import com.forensic.analyzer.repository.EvidenceRepository;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class EvidenceService {

    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private AuditLogService auditLogService;

    // ===================== Upload =====================
    public void saveEvidence(MultipartFile file, String username) throws IOException {
        byte[] fileHashBytes;
        try (InputStream is = file.getInputStream()) {
            // Compute SHA-256 hash from InputStream (exact file bytes)
            fileHashBytes = DigestUtils.sha256(is);
        }

        Evidence evidence = new Evidence();
        evidence.setFileName(file.getOriginalFilename());
        evidence.setType(file.getContentType());
        evidence.setHash(DigestUtils.sha256Hex(fileHashBytes)); // store as hex string
        evidence.setUploadedBy(username);
        evidence.setTimestamp(LocalDateTime.now());
        evidence.setTampered(false); // always false on upload

        Evidence saved = evidenceRepository.save(evidence);
        auditLogService.logAction(username, saved.getId(), "UPLOAD");
    }

    // ===================== List All Evidence =====================
    public List<Evidence> getAllEvidence() {
        return evidenceRepository.findAll();
    }

    // ===================== List Evidence by User =====================
    public List<Evidence> getEvidenceByUser(String username) {
        return evidenceRepository.findByUploadedBy(username);
    }

    // ===================== Verify Evidence (Byte-level) =====================
    public boolean verifyEvidence(Long evidenceId, MultipartFile file, String username) throws IOException {
        Optional<Evidence> optionalEvidence = evidenceRepository.findById(evidenceId);
        if (optionalEvidence.isEmpty()) {
            return false; // evidence not found
        }

        Evidence evidence = optionalEvidence.get();

        // Convert stored hash hex string to byte array
        byte[] storedHashBytes = hexStringToByteArray(evidence.getHash());

        // Compute hash of uploaded file as byte array
        byte[] currentHashBytes;
        try (InputStream is = file.getInputStream()) {
            currentHashBytes = DigestUtils.sha256(is);
        }

        // Compare byte arrays directly
        boolean tampered = !Arrays.equals(storedHashBytes, currentHashBytes);

        evidence.setTampered(tampered);
        evidenceRepository.save(evidence);

        auditLogService.logAction(username, evidenceId, "VERIFY_" + (tampered ? "TAMPERED" : "VALID"));

        // Optional debug prints
        System.out.println("Stored hash bytes: " + Arrays.toString(storedHashBytes));
        System.out.println("Uploaded hash bytes: " + Arrays.toString(currentHashBytes));
        System.out.println("Tampered: " + tampered);

        return !tampered; // true if valid, false if tampered
    }

    // ===================== Helper: Hex String to Byte Array =====================
    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

    // ===================== Delete Evidence (Admin/Investigator) =====================
    public void deleteEvidence(Long id, String username) {
        evidenceRepository.deleteById(id);
        auditLogService.logAction(username, id, "DELETE");
    }
}

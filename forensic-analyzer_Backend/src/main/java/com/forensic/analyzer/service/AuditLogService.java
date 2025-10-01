package com.forensic.analyzer.service;

import com.forensic.analyzer.entity.AuditLog;
import com.forensic.analyzer.entity.User;
import com.forensic.analyzer.repository.AuditLogRepository;
import com.forensic.analyzer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuditLogService {

    @Autowired private AuditLogRepository auditLogRepository;
    @Autowired private UserRepository userRepository;

    public void logAction(String username, Long evidenceId, String action) {
        User user = userRepository.findByUsername(username).orElseThrow();
        AuditLog log = new AuditLog();
        log.setUserId(user.getId());
        log.setEvidenceId(evidenceId);
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }
}

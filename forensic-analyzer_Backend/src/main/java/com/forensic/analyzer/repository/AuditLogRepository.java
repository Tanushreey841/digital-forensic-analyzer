package com.forensic.analyzer.repository;

import com.forensic.analyzer.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {}

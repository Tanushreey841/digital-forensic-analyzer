package com.forensic.analyzer.repository;

import com.forensic.analyzer.entity.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Long> {

    // Custom query method to find evidence by uploadedBy field
    List<Evidence> findByUploadedBy(String uploadedBy);
}

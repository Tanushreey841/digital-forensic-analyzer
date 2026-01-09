 Digital Forensic Log & Evidence Analyzer
📌 Project Overview

The Digital Forensic Log & Evidence Analyzer is a secure backend-driven web application designed to assist investigators in uploading, analyzing, and verifying digital logs and evidence files. The system focuses on data integrity, access control, and auditability, making it suitable for academic and forensic use cases.

The application ensures that uploaded evidence remains untampered by implementing cryptographic hash verification and role-based access control (RBAC) using modern backend technologies.

🎯 Key Features

Secure upload and storage of digital evidence files

SHA-256 based tamper detection for integrity verification

JWT-based authentication with role-based access control (RBAC)

Investigator and admin dashboards with controlled permissions

Evidence metadata tracking and audit logging

Report generation in PDF and CSV formats

RESTful APIs for evidence management and verification

🛠 Technology Stack
Backend

Java

Spring Boot

Spring Security (JWT)

Hibernate (JPA)

Maven

Database

MySQL

H2 (for development/testing)

Security & Utilities

SHA-256 Hashing

Apache Commons Codec

iText (PDF generation)

Apache POI (CSV/Excel handling)

Frontend (Basic)

React.js (for dashboards)

🔐 Security Implementation

JWT Authentication for stateless and secure API access

Role-Based Access Control (RBAC) to restrict sensitive operations

SHA-256 hashing to detect any modification in stored evidence files

Server-side validation and controlled file access

📂 Project Modules

User Authentication & Authorization

Evidence Upload & Storage

Hash Generation & Verification

Audit & Activity Logging

Report Generation (PDF / CSV)

📖 Use Case

This project simulates a digital forensics workflow, where investigators can:

Upload evidence files

Generate cryptographic hashes

Verify file integrity over time

Maintain audit trails for accountability


 
 Project Type

Individual Academic Project

Duration: Oct 2024 – Dec 2024

🚀 Future Enhancements

Advanced log analysis and pattern detection

Cloud-based secure storage

Enhanced reporting dashboards

Multi-factor authentication (MFA)


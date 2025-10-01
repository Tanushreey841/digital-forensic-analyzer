// Class: SignupRequest
package com.forensic.analyzer.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String password;
    private String role;  // e.g. "ADMIN", "INVESTIGATOR", "VIEWER"
}

// Class: AuthResponse
package com.forensic.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String jwtToken;
}

package com.forensic.analyzer.controller;

import com.forensic.analyzer.dto.AuthRequest;
import com.forensic.analyzer.dto.SignupRequest;
import com.forensic.analyzer.entity.User;
import com.forensic.analyzer.service.UserService;
import com.forensic.analyzer.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping // ✅ No global prefix, we’ll set per-endpoint
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ========================= SIGNUP =========================
    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            String username = signupRequest.getUsername();
            String rawPassword = signupRequest.getPassword();
            String rawRole = signupRequest.getRole();

            String role = (rawRole == null || rawRole.isEmpty())
                    ? "VIEWER"
                    : rawRole.toUpperCase();

            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(passwordEncoder.encode(rawPassword));
            newUser.setRole(role);  // keep roles consistent ("ADMIN", "VIEWER", "INVESTIGATOR")

            userService.save(newUser);

            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Signup failed: " + e.getMessage());
        }
    }

    // ========================= LOGIN =========================
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        final UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
        final User dbUser = userService.getUserRepository()
                .findByUsername(request.getUsername())
                .orElseThrow();

        final String jwt = jwtUtil.generateToken(userDetails.getUsername(), dbUser.getRole());

        return ResponseEntity.ok(Map.of(
                "jwt", jwt,
                "username", dbUser.getUsername(),
                "role", dbUser.getRole()
        ));
    }

    // ========================= ADMIN APIs =========================
    // ✅ Now secured only by SecurityConfig route matcher (.requestMatchers("/admin/**").hasRole("ADMIN"))

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}

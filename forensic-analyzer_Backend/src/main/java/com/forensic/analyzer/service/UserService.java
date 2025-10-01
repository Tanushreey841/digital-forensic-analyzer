package com.forensic.analyzer.service;

import com.forensic.analyzer.entity.User;
import com.forensic.analyzer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    // ✅ Fetch all users (for Admin)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Delete user by ID (for Admin)
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}

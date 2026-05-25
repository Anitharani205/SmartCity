package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.*;
import com.example.backend.jwt.JwtUtil;
import com.example.backend.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AadhaarRepository aadhaarRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= REGISTER =================

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        // Aadhaar validation
        Aadhaar aadhaar =
                aadhaarRepo.findByAadhaarNumber(
                        user.getAadhaar()
                );

        if(aadhaar == null) {
            return "Invalid Aadhaar";
        }

        if(!aadhaar.getStatus().equals("ACTIVE")) {
            return "Aadhaar not active";
        }

        // Duplicate email
        if(userRepo.findByEmail(user.getEmail()) != null) {
            return "Email already exists";
        }

        // Role mapping
        String email = user.getEmail();

        if(email.endsWith("@citizen.com")) {

            user.setRole(Role.CITIZEN);

        } else if(email.endsWith("@municipal.com")) {

            user.setRole(Role.MUNICIPAL);

        } else if(email.endsWith("@admin.com")) {

            user.setRole(Role.ADMIN);

        } else {

            return "Invalid Email Domain";
        }

        // Encrypt password
        user.setPassword(
                encoder.encode(user.getPassword())
        );

        userRepo.save(user);

        return "Signup Successful";
    }

    // ================= LOGIN =================

    @PostMapping("/login")
    public Object login(
            @RequestBody LoginRequest req
    ) {

        User user =
                userRepo.findByEmail(req.getEmail());

        if(user == null) {
            return "User Not Found";
        }

        // Compare encrypted password
        if(!encoder.matches(
                req.getPassword(),
                user.getPassword()
        )) {

            return "Invalid Password";
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole().name()
                );

        return new AuthResponse(
                token,
                user.getRole().name()
        );
    }
}
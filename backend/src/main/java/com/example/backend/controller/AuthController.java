package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.*;
import com.example.backend.jwt.JwtUtil;
import com.example.backend.repository.*;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // REGISTER
    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {

    System.out.println("AADHAAR RECEIVED: " + user.getAadhaar());

   String inputAadhaar = user.getAadhaar().trim();

Aadhaar aadhaar = aadhaarRepo
        .findByAadhaarNumber(inputAadhaar);

        if (aadhaar == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid Aadhaar"));
        }

        if (!aadhaar.getStatus().equals("ACTIVE")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Aadhaar Not Active"));
        }

        if (userRepo.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email Already Exists"));
        }

        // role based on email
        String email = user.getEmail();

      if (email.endsWith("@citizen.com")) {

    user.setRole(Role.CITIZEN);

} else if (email.endsWith("@municipal.com")) {

    user.setRole(Role.MUNICIPAL);

    // assign later from Admin page
    user.setDepartment(null);

    user.setActiveTasks(0);

} else if (email.endsWith("@admin.com")) {

    user.setRole(Role.ADMIN);

} else {

    return ResponseEntity.badRequest()
            .body(Map.of("message", "Invalid Email Domain"));
}

       user.setPassword(encoder.encode(user.getPassword()));

try {

    userRepo.save(user);

} catch (Exception e) {

    e.printStackTrace();

    return ResponseEntity.badRequest()
            .body(Map.of(
                    "message",
                    e.toString()
            ));
}

return ResponseEntity.ok(
        Map.of("message", "Signup Successful")
);
}

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        User user = userRepo.findByEmail(req.getEmail());

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "User Not Found"));
        }

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid Password"));
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "role", user.getRole().name(),
                        "message", "Login Successful"
                )
        );
    }
}
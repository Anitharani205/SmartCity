package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.backend.service.EmailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepo;
@Autowired
private EmailService emailService;

@Autowired
private PasswordEncoder passwordEncoder;
   
    @GetMapping
    public List<User> getUsers() {

        return userRepo.findAll();
    }
    


  @PostMapping("/create")
public User createUser(@RequestBody User user) {

    try {

        user.setStatus("Active");

        if (user.getActiveTasks() == null) {
            user.setActiveTasks(0);
        }

        String email = user.getEmail();

        String plainPassword = user.getPassword();

        user.setPassword(passwordEncoder.encode(plainPassword));

        User savedUser = userRepo.save(user);

        try {
            emailService.sendCredentials(email, plainPassword);
            System.out.println("EMAIL SENT SUCCESSFULLY");
        } catch (Exception e) {
            System.out.println("EMAIL FAILED");
            e.printStackTrace();
        }

        return savedUser;

    } catch (Exception e) {
        e.printStackTrace();
        throw e;
    }
}
    @GetMapping("/department/{category}")
public List<User> getStaffByCategory(
        @PathVariable String category
) {

    String department;

   switch (category) {

    case "Water Issue":
    case "Plumbing":
        department = "Water";
        break;

    case "Electricity Issue":
    case "Electrical":
    case "Appliance Repair":
    case "AC Service":
        department = "Electrical";
        break;

    case "Road Issue":
        department = "Road";
        break;

    case "Drainage Issue":
        department = "Drainage";
        break;

    case "Garbage Issue":
    case "Cleaning":
    case "Gardening":
    case "Pest Control":
        department = "Sanitation";
        break;

    default:
        department = "General";
}

    return userRepo
            .findByRoleAndDepartmentOrderByActiveTasksAsc(
                    com.example.backend.entity.Role.MUNICIPAL,
                    department
            );
}
   
    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id
    ) {

        userRepo.deleteById(id);

        return "User Deleted";
    }
   @PostMapping
public User createUserDefault(@RequestBody User user) {

    try {

        user.setStatus("Active");

        if (user.getActiveTasks() == null) {
            user.setActiveTasks(0);
        }

        String email = user.getEmail();
        String plainPassword = user.getPassword();

        user.setPassword(passwordEncoder.encode(plainPassword));

        User savedUser = userRepo.save(user);

        try {
            emailService.sendCredentials(email, plainPassword);
            System.out.println("EMAIL SENT SUCCESSFULLY");
        } catch (Exception e) {
            System.out.println("EMAIL FAILED");
            e.printStackTrace();
        }

        return savedUser;

    } catch (Exception e) {
        e.printStackTrace();
        throw e;
    }
}
    
    @PutMapping("/toggle/{id}")
    public String toggleStatus(
            @PathVariable Long id
    ) {

        User user =
                userRepo.findById(id).orElse(null);

        if(user == null) {
            return "User Not Found";
        }

        if(user.getStatus() == null ||
                user.getStatus().equals("Active")) {

            user.setStatus("Blocked");

        } else {

            user.setStatus("Active");
        }

        userRepo.save(user);

        return "Updated";
    }
    @PutMapping("/department/{id}")
public User updateDepartment(
        @PathVariable Long id,
        @RequestBody User req
) {

    User user =
            userRepo.findById(id).orElse(null);

    if(user == null) {
        return null;
    }

    user.setDepartment(req.getDepartment());

    return userRepo.save(user);
}
}

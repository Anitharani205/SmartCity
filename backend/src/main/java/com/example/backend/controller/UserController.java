package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepo;

   
    @GetMapping
    public List<User> getUsers() {

        return userRepo.findAll();
    }
   @PostMapping("/create")
public User createUser(
        @RequestBody User user
) {

    user.setStatus("Active");

    if(user.getActiveTasks() == null) {
        user.setActiveTasks(0);
    }

    return userRepo.save(user);
}
    @GetMapping("/department/{category}")
public List<User> getStaffByCategory(
        @PathVariable String category
) {

    String department;

    switch (category) {

        case "Water Issue":
            department = "Water";
            break;

        case "Electricity Issue":
            department = "Electrical";
            break;

        case "Road Issue":
            department = "Road";
            break;

        case "Garbage Issue":
            department = "Sanitation";
            break;

        case "Drainage Issue":
            department = "Drainage";
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

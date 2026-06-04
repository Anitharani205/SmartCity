package com.example.backend.repository;

import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository
        extends JpaRepository<User, Long> {

    User findByEmail(String email);

    List<User> findByRoleAndDepartmentOrderByActiveTasksAsc(
            Role role,
            String department
    );
}
package com.mateus.game.controller;

import com.mateus.game.dto.UserResponseDTO;
import com.mateus.game.entity.User;
import com.mateus.game.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponseDTO> listAll() {
        return userService.findAll();
    }

    @PostMapping
    public UserResponseDTO create(@RequestBody User user) {
        return userService.save(user);
    }
}
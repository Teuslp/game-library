package com.mateus.game.repository;

import com.mateus.game.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    // Aqui você já ganha métodos como save(), findAll(), deleteById()
}
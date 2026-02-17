package com.mateus.game.dto;

import java.util.UUID;
import java.time.LocalDateTime;

public record UserResponseDTO(
        UUID id,
        String name,
        String email,
        LocalDateTime createdAt
) {

}
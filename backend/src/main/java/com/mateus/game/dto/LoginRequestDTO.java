package com.mateus.game.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank String email,
        @NotBlank String password
) {
}
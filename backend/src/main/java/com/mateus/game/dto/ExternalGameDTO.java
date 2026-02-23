package com.mateus.game.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ExternalGameDTO(
        Long id,
        String name,
        @JsonProperty("released") String released,
        @JsonProperty("background_image") String backgroundImage,
        Double rating
) {
}
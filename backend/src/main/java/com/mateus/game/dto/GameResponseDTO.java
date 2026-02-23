package com.mateus.game.dto;

import com.mateus.game.entity.Game;

public record GameResponseDTO(
        Long rawgId,
        String name,
        String backgroundImage,
        Double rating
) {
    public GameResponseDTO(Game game) {
        this(game.getRawgId(), game.getName(), game.getBackgroundImage(), game.getRating());
    }
}
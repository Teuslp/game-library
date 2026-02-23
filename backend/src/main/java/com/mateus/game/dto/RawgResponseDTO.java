package com.mateus.game.dto;

import java.util.List;

public record RawgResponseDTO(
        Integer count,
        List<ExternalGameDTO> results
) {
}
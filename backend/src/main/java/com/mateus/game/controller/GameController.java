package com.mateus.game.controller;

import com.mateus.game.dto.RawgResponseDTO;
import com.mateus.game.service.GameApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/games")
public class GameController {

    private final GameApiService gameApiService;

    public GameController(GameApiService gameApiService) {
        this.gameApiService = gameApiService;
    }

    @GetMapping("/search")
    public ResponseEntity<RawgResponseDTO> search(@RequestParam String name) {
        RawgResponseDTO response = gameApiService.searchGames(name);
        return ResponseEntity.ok(response);
    }
}
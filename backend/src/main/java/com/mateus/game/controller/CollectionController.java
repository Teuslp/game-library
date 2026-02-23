package com.mateus.game.controller;

import com.mateus.game.entity.Game;
import com.mateus.game.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/collections")
public class CollectionController {

    private final CollectionService collectionService;

    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @PostMapping("/add/{rawgId}")
    public ResponseEntity<String> addGame(@PathVariable Long rawgId) {
        try {
            collectionService.addGameToCollection(rawgId);
            return ResponseEntity.ok("Jogo adicionado à sua coleção com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erro ao salvar jogo: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Set<Game>> getMyCollection() {
        return ResponseEntity.ok(collectionService.getUserCollection());
    }

}
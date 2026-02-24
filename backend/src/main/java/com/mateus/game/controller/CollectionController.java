package com.mateus.game.controller;

import com.mateus.game.dto.GameResponseDTO;
import com.mateus.game.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<List<GameResponseDTO>> getMyCollection() {
        return ResponseEntity.ok(collectionService.getUserCollection());
    }

    @DeleteMapping("/remove/{rawgId}")
    public ResponseEntity<String> removeGame(@PathVariable Long rawgId) {
        try {
            collectionService.removeGameFromCollection(rawgId);
            return ResponseEntity.ok("Jogo removido da sua coleção com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao remover jogo: " + e.getMessage());
        }
    }

}
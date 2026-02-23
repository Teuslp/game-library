package com.mateus.game.service;

import com.mateus.game.dto.ExternalGameDTO;
import com.mateus.game.entity.Game;
import com.mateus.game.entity.User;
import com.mateus.game.repository.GameRepository;
import com.mateus.game.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Set;

@Service
public class CollectionService {

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final GameApiService gameApiService;

    public CollectionService(GameRepository gameRepository, UserRepository userRepository, GameApiService gameApiService) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.gameApiService = gameApiService;
    }

    @Transactional
    public void addGameToCollection(Long rawgId) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = (User) userRepository.findByEmail(userEmail);

        Game game = gameRepository.findByRawgId(rawgId).orElseGet(() -> {
            return saveNewGameFromApi(rawgId);
        });

        user.getGames().add(game);
        userRepository.save(user);
    }

    private Game saveNewGameFromApi(Long rawgId) {
        ExternalGameDTO dto = gameApiService.findGameById(rawgId);

        Game newGame = new Game();
        newGame.setRawgId(dto.id());
        newGame.setName(dto.name());
        newGame.setBackgroundImage(dto.backgroundImage());
        newGame.setReleased(dto.released());
        newGame.setRating(dto.rating());

        return gameRepository.save(newGame);
    }

    // Adicione este método ao seu CollectionService.java
    public Set<Game> getUserCollection() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = (User) userRepository.findByEmail(userEmail);

        return user.getGames();
    }

}
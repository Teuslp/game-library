package com.mateus.game.service;

import com.mateus.game.dto.RawgResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GameApiService {

    private final RestTemplate restTemplate;

    @Value("${api.rawg.key}")
    private String apiKey;

    private final String BASE_URL = "https://api.rawg.io/api/games";

    public GameApiService() {
        this.restTemplate = new RestTemplate();
    }

    public RawgResponseDTO searchGames(String searchName) {
        String url = UriComponentsBuilder.fromUriString(BASE_URL)
                .queryParam("key", apiKey)
                .queryParam("search", searchName)
                .queryParam("page_size", 10)
                .build()
                .toUriString();

        try {
            return restTemplate.getForObject(url, RawgResponseDTO.class);
        } catch (Exception e) {
            System.err.println("Erro ao chamar a API RAWG: " + e.getMessage());
            return new RawgResponseDTO(0, java.util.List.of());
        }
    }
}
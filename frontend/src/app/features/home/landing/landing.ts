import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class Landing implements OnInit {
  featuredGames: any[] = [];

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Buscando uma palavra-chave como destaque para encher o carrossel usando a API real
    this.gameService.searchGames('witcher').subscribe({
      next: (response: any) => {
        console.log('Resposta da API do Backend:', response);
        
        if (response && response.results && response.results.length > 0) {
          this.featuredGames = response.results.slice(0, 6).map((g: any) => ({
            id: g.id,
            title: g.name || 'Jogo Desconhecido',
            genre: `★ Rating: ${g.rating ? g.rating : 'N/A'}`,
            imageUrl: g.background_image || g.backgroundImage || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop'
          }));
        } else {
          console.warn('Backend retornou vazio. Usando Fallback.');
          this.featuredGames = this.getFallbackGames();
        }
        
        // O Angular às vezes perde o trigger de re-renderização quando lidamos com arrays e requisições assíncronas em standalone
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao recarregar a API:', err);
        this.featuredGames = this.getFallbackGames();
        this.cdr.detectChanges();
      }
    });
  }

  private getFallbackGames() {
    return [
      { id: 1, title: 'Witcher Fallback', genre: '★ Rating: 4.8', imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop' },
      { id: 2, title: 'Cyber Neon City', genre: '★ Rating: 4.5', imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=600&auto=format&fit=crop' },
      { id: 3, title: 'Starlight Odyssey', genre: '★ Rating: 4.9', imageUrl: 'https://images.unsplash.com/photo-1614729939124-03290b5509ce?w=600&auto=format&fit=crop' },
      { id: 4, title: 'Galactic Warfare', genre: '★ Rating: 4.1', imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&auto=format&fit=crop' }
    ];
  }
}

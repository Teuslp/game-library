import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService, Game } from '../../../core/services/game.service';
import { CollectionService } from '../../../core/services/collection.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-game-discovery',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './game-discovery.html',
  styleUrl: './game-discovery.scss'
})
export class GameDiscovery implements OnInit {
  searchQuery = '';
  games: Game[] = [];
  isLoading = false;
  addedGames: Set<number> = new Set();
  addingGames: Set<number> = new Set();
  
  private searchTerms = new Subject<string>();

  constructor(
    private gameService: GameService,
    private collectionService: CollectionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap((term: string) => {
        const query = term.trim() ? term : 'popular';
        return this.gameService.searchGames(query).pipe(
          catchError((err) => {
            console.error('Erro ao buscar jogos:', err);
            return of([]);
          })
        );
      })
    ).subscribe((games) => {
      this.games = Array.isArray(games) ? games : (games as any).content || (games as any).results || [];
      this.isLoading = false;
    });

    this.searchTerms.next('popular');
  }

  onSearchInput(event: any): void {
    this.searchTerms.next(this.searchQuery);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  search(query: string = this.searchQuery) {
    this.searchTerms.next(query);
  }

  addToCollection(game: Game) {
    const gameId = game.externalId || game.id;
    this.addingGames.add(gameId!);
    
    this.collectionService.addGameToCollection(gameId!, 'PLAN_TO_PLAY').subscribe({
      next: () => {
        this.addingGames.delete(gameId!);
        this.addedGames.add(gameId!);
      },
      error: () => {
        this.addingGames.delete(gameId!);
      }
    });
  }
}

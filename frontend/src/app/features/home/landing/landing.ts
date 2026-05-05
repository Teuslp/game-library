import { Component, OnInit, HostListener, AfterViewInit, ElementRef, ViewChild, OnDestroy, ChangeDetectionStrategy, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing implements OnInit, AfterViewInit, OnDestroy {
  private gameService = inject(GameService);
  private destroyRef = inject(DestroyRef);

  featuredGames = signal<any[]>([]);
  scrollY = signal(0);
  isLaserFired = signal(false);
  isFeaturedLaserFired = signal(false);

  @ViewChild('featuresSection') featuresSection!: ElementRef;
  @ViewChild('featuredSection') featuredSection!: ElementRef;
  private observer: IntersectionObserver | null = null;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollY.set(window.scrollY);
  }

  ngOnInit() {
    this.gameService.searchGames('witcher')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: any) => {
          if (response && response.results && response.results.length > 0) {
            this.featuredGames.set(response.results.slice(0, 6).map((g: any) => ({
              id: g.id,
              title: g.name || 'Jogo Desconhecido',
              genre: `★ Rating: ${g.rating ? g.rating : 'N/A'}`,
              imageUrl: g.background_image || g.backgroundImage || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop'
            })));
          } else {
            this.featuredGames.set(this.getFallbackGames());
          }
        },
        error: (err: any) => {
          this.featuredGames.set(this.getFallbackGames());
        }
      });
  }

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.featuresSection?.nativeElement) {
            this.isLaserFired.set(true);
            this.observer?.unobserve(entry.target);
          } else if (entry.target === this.featuredSection?.nativeElement) {
            this.isFeaturedLaserFired.set(true);
            this.observer?.unobserve(entry.target);
          }
        }
      });
    }, options);

    if (this.featuresSection) {
      this.observer.observe(this.featuresSection.nativeElement);
    }
    if (this.featuredSection) {
      this.observer.observe(this.featuredSection.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
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

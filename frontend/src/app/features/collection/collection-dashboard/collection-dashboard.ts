import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CollectionService, CollectionItem } from '../../../core/services/collection.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-collection-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './collection-dashboard.html',
  styleUrl: './collection-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionDashboard {
  private collectionService = inject(CollectionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  collection = toSignal(this.collectionService.getMyCollection());

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

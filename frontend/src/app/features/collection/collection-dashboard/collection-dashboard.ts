import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CollectionService, CollectionItem } from '../../../core/services/collection.service';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './collection-dashboard.html',
  styleUrl: './collection-dashboard.scss'
})
export class CollectionDashboard implements OnInit {
  collection$: Observable<CollectionItem[]>;

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.collection$ = this.collectionService.getMyCollection();
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

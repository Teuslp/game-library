import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/landing/landing').then(m => m.Landing)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  { 
    path: 'collection', 
    loadComponent: () => import('./features/collection/collection-dashboard/collection-dashboard').then(m => m.CollectionDashboard),
    canActivate: [authGuard]
  },
  { 
    path: 'games', 
    loadComponent: () => import('./features/games/game-discovery/game-discovery').then(m => m.GameDiscovery),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];

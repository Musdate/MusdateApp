import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './core/guards';

export const routes: Routes = [
    {
        path: '',
        canActivate: [ isNotAuthenticatedGuard ],
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'landing',
        canActivate: [ isAuthenticatedGuard ],
        loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

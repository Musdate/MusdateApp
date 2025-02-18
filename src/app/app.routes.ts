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
        loadChildren: () => import('./pages/landing/landing.routes').then(m => m.LANDING_ROUTES)
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
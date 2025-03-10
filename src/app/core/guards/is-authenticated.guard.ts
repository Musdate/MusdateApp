import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.authStatus() != AuthStatus.notAuthenticated ) {
    return true;
  }

  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};
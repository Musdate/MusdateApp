import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );

  if ( authService.authStatus() === AuthStatus.notAuthenticated ) {
    return true;
  }

  return false;
};
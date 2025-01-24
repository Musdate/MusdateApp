import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from './core/interfaces';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly authService = inject( AuthService );
  private readonly router      = inject( Router );

  public finishedAuthCheck = computed<boolean>(() => {
    return this.authService.authStatus() !== AuthStatus.checking;
  });

  public authStatusChangedEffect = effect( () => {

    switch ( this.authService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        console.log(this.authService.authStatus());
        this.router.navigateByUrl('/landing', { replaceUrl: true });
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/login', { replaceUrl: true });
        return;

    }
  });
}
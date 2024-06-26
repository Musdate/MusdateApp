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

  private authService = inject( AuthService );
  private router      = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {

    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect( () => {

    switch ( this.authService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        console.log(this.authService.authStatus());
        this.router.navigateByUrl('/landing');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/login');
        return;

    }
  })
}

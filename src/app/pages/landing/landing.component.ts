import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  private authService = inject( AuthService );

  onLogout() {
    this.authService.logout();
  }

}

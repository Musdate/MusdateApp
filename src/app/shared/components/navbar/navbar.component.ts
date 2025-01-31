import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services';

import {
  LogoutIconComponent,
  MenuIconComponent,
  CloseIconComponent,
  MangasIconComponent,
  RecipesIconComponent,
  MoviesIconComponent,
  WalksIconComponent,
  SettingsIconComponent
} from '../Icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    LogoutIconComponent,
    MenuIconComponent,
    CloseIconComponent,
    RecipesIconComponent,
    MangasIconComponent,
    MoviesIconComponent,
    WalksIconComponent,
    SettingsIconComponent,
    RouterModule
   ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private readonly authService = inject( AuthService );

  public showSidebar: boolean;

  constructor() {
    this.showSidebar = false;
  }

  get userName(): string {
    const user = this.authService.currentUser();
    return user ? user.name : 'Username';
  }

  onLogout() {
    this.authService.logout();
  }

  toogleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
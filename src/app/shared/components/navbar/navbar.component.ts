import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    SettingsIconComponent
   ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private readonly authService = inject( AuthService );

  public userName: string;
  public showSidebar: boolean;

  constructor() {
    this.userName = this.authService.currentUser()!.name;
    this.showSidebar = false;
  }

  onLogout() {
    this.authService.logout();
  }

  toogleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

}
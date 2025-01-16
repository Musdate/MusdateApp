import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { SvgComponent } from '../Icons/svg.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, SvgComponent ],
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

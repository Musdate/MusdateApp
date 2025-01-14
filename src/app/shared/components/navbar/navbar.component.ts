import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly authService = inject( AuthService );

  public userName: string;

  constructor() {
    this.userName = this.authService.currentUser()!.name;
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
  }

}

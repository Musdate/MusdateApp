import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ NavbarComponent, RouterOutlet, SettingsComponent ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}

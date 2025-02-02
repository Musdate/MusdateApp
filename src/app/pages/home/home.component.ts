import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ClickIconComponent } from 'src/app/shared/components/Icons/click-icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    ClickIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
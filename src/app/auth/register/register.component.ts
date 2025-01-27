import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public register() {
    Swal.fire({
      icon: 'info',
      title: 'Registro deshabilitado temporalmente.',
      showConfirmButton: false,
      showClass: {
        popup: `animate__animated animate__fadeIn`
      },
    });
  }
}
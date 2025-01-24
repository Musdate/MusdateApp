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
      position: 'top-end',
      icon: 'info',
      title: 'Atención!',
      text: 'Registro deshabilitado temporalmente.',
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false,
      showClass: {
        popup: `animate__animated animate__fadeIn`
      },
    });
  }
}
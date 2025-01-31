import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    LoadingComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authService = inject( AuthService );
  private readonly fb          = inject( FormBuilder );
  private readonly router      = inject( Router );

  public isLoading: boolean;
  public userForm: FormGroup;
  public errorFields: { name: boolean, email: boolean, password: boolean };

  constructor() {
    this.isLoading = false;
    this.errorFields = { name: false, email: false, password: false };
    this.userForm = this.fb.group({
      name     : [ '', [ Validators.required ]],
      email    : [ '', [ Validators.required, Validators.email ]],
      password : [ '', [ Validators.required, Validators.minLength(6) ]],
      banks    : [[
        { name: 'Bancolombia', number: '' },
        { name: 'Nequi', number: '' }
      ]]
    });
  }

  public register() {

    if ( this.userForm.valid ) {

      this.isLoading = true;

      this.authService.register( this.userForm.value ).subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            title: 'Registro Exitoso!!',
            icon: 'success',
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,
            showClass: {
              popup: `animate__animated animate__fadeIn`
            }
          });
          this.router.navigateByUrl('/landing');
        },
        error: ( message ) => {
          Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error'
          });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });

    } else {

      Swal.fire({
        html: this.validationErrors(),
        icon: 'error',
        confirmButtonText: "OK",
      }).then(() => {
        this.errorFields = { name: false, email: false, password: false };
      });

    }
  }

  private validationErrors(): string {
    let htmlError = '<div class="error-message-container">';

    if ( this.userForm.controls['name'].errors ) {
      this.errorFields.name = true;

      if ( this.userForm.controls['name'].hasError('required') ) {
        htmlError += '<div> Username es requerido </div>';
      }
    }
    if ( this.userForm.controls['email'].errors ) {
      this.errorFields.email = true;

      if ( this.userForm.controls['email'].hasError('required') ) {
        htmlError += '<div> Email es requerido </div>';
      }
      if ( this.userForm.controls['email'].hasError('email') ) {
        htmlError += '<div> Email invalido </div>';
      }
    }
    if ( this.userForm.controls['password'].errors ) {
      this.errorFields.password = true;

      if ( this.userForm.controls['password'].hasError('required') ) {
        htmlError += '<div> Password es requerido </div>';
      }
      if ( this.userForm.controls['password'].hasError('minlength') ) {
        htmlError += '<div> Password debe ser de mínimo 6 caracteres </div>';
      }
    }

    htmlError += '</div>';

    return htmlError;
  }
}
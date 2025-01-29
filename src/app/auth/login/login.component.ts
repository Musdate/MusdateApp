import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services';

import Swal from 'sweetalert2';
import 'animate.css';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private readonly fb          = inject( FormBuilder);
  private readonly authService = inject( AuthService);
  private readonly router      = inject( Router );

  public isLoading: boolean;
  public loginForm: FormGroup = this.fb.group({
    email:      ['admin@gmail.com', [ Validators.required, Validators.email ]],
    password:   ['123456', [ Validators.required, Validators.minLength(6) ]],
    rememberMe: [ false ]
  });

  constructor() {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loadRememberedUser();
  }

  private loadRememberedUser() {
    const savedUser = localStorage.getItem('rememberedUser');

    if ( savedUser ) {
      this.loginForm.patchValue({ email: savedUser, password: '', rememberMe: true });
    }
  }

  public login() {
    const { email, password, rememberMe } = this.loginForm.value;

    if ( rememberMe ) {
      localStorage.setItem('rememberedUser', email);
    } else {
      localStorage.removeItem('rememberedUser');
    }

    this.isLoading = true;

    this.authService.login( email, password ).subscribe({
      next: () => {
        this.router.navigateByUrl('/landing')
      },
      error: ( message ) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error',
          text: message,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
          showClass: {
            popup: `animate__animated animate__fadeIn`
          },
        });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
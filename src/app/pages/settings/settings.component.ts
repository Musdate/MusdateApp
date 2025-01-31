import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bank } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  private readonly authService = inject( AuthService );
  private readonly fb          = inject( FormBuilder );

  public userForm: FormGroup;
  public isLoading: boolean;
  public errorNameField: boolean;

  constructor() {
    this.isLoading = false;
    this.errorNameField = false;
    this.userForm = this.fb.group({
      name  : [ this.authService.currentUser()!.name, [ Validators.required ]],
      email : [ { value: this.authService.currentUser()!.email, disabled: true }, [ Validators.required ]],
      banks : this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadBanks();
  }

  get banks() {
    return this.userForm.get('banks') as FormArray;
  }

  private loadBanks() {
    this.authService.currentUser()?.banks.forEach(( bank ) => {
      this.banks.push( this.createBanksForm( bank ));
    })
  }

  private createBanksForm( bank: Bank ): FormGroup {
    return this.fb.group({
      name: [ bank.name, [ Validators.required ]],
      number: [ bank.number ]
    });
  }

  public saveSettings() {

    if ( this.userForm.valid ) {

      this.isLoading = true;

      this.authService.updateUser( this.authService.currentUser()!._id, this.userForm.value ).subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            title: 'Guardado Exitoso!!',
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            showClass: {
              popup: `animate__animated animate__fadeIn`
            }
          });
        },
        error: ( message ) => {
          Swal.fire({
            title: 'Error',
            text: message.error.message,
            icon: 'error'
          });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          console.log(this.authService.currentUser());
        }
      });

    } else {

      let htmlError = '';

      if ( this.userForm.controls['name'].hasError('required') ) {
        this.errorNameField = true;
        htmlError += '<div class="error-message-container"><div> Username es requerido </div></div>';
      }

      Swal.fire({
        title: 'Error',
        html: htmlError,
        icon: 'error',
        confirmButtonText: "OK",
      }).then(() => {
        this.errorNameField = false;
      });

    }
  }
}
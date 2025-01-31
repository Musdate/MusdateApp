import { Component, inject, OnInit } from '@angular/core';
import { Pet, WalksPrice } from 'src/app/core/interfaces';
import { AuthService, WalksService } from 'src/app/core/services';
import { EditIconComponent } from 'src/app/shared/components/Icons';
import { PlusIconComponent } from 'src/app/shared/components/Icons/plus-icon.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { WalkCardComponent } from 'src/app/shared/components/walk-card/walk-card.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-walks',
  standalone: true,
  imports: [
    WalkCardComponent,
    PlusIconComponent,
    EditIconComponent,
    LoadingComponent
   ],
  templateUrl: './walks.component.html',
  styleUrl: './walks.component.scss'
})
export class WalksComponent implements OnInit {

  private readonly walkService = inject( WalksService );
  private readonly authService = inject( AuthService );

  public allPets: Pet[];
  public walksPrice: WalksPrice;
  public isLoading: boolean;
  public isLoadingPets: boolean;
  public isLoadingWalks: boolean;

  constructor() {
    this.allPets = [];
    this.walksPrice = {
      oneDay: 0,
      threeDays: 0,
      fourDays: 0,
      fiveDays: 0
    };
    this.isLoadingPets = false;
    this.isLoadingWalks = false;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loadPets();
    this.loadWalksPrice();
  }

  loadPets() {
    this.isLoadingPets = true;

    this.walkService.findAllPets( this.authService.currentUser()!._id ).subscribe({
      next: ( pets ) => {
        this.allPets = pets
      },
      error: ( message ) => {
        Swal.fire({
          title: 'Error',
          text: message.error.message,
          icon: 'error'
        });
        this.isLoadingPets = false;
      },
      complete: () => {
        this.isLoadingPets = false;
      }
    });
  }

  loadWalksPrice() {
    this.isLoadingWalks = true;

    this.walkService.findWalksPrice( this.authService.currentUser()!._id ).subscribe({
      next: ( walksPrice ) => {
        this.walksPrice = walksPrice
      },
      error: ( message ) => {
        Swal.fire({
          title: 'Error',
          text: message.error.message,
          icon: 'error'
        });
        this.isLoadingWalks = false;
      },
      complete: () => {
        this.isLoadingWalks = false;
      }
    })
  }

  onSavePet( formValue: Pet ): void {
    this.isLoading = true;

    this.walkService.onSavePet( this.authService.currentUser()!._id, formValue ).subscribe({
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
        this.loadPets();
        this.isLoading = false;
      }
    });
  }

  onSaveWalksPrice( formValue: WalksPrice ): void {
    this.isLoading = true;

    this.walkService.addWalksPrice( this.authService.currentUser()!._id , formValue ).subscribe({
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
        this.loadWalksPrice();
        this.loadPets();
        this.isLoading = false;
      }
    });
  }

  reloadPets(): void {
    this.loadPets();
  }

  async addPet() {
    const { value: formValues } = await Swal.fire({
      title: "Agregar Mascota",
      html: `
        <label for="swal-petName"> Nombre </label>
        <input id="swal-petName" class="modal-input" type="text" placeholder="Nombre Mascota" autocomplete="off">
        <label for="swal-petComment"> Comentario </label>
        <input id="swal-petComment" class="modal-input" type="text" placeholder="Comentario" autocomplete="off">
      `,
      focusConfirm: false,
      confirmButtonText: "Guardar",
      customClass: {
        confirmButton: "primary-btn",
        cancelButton: "primary-btn"
      },
      preConfirm: () => {
        return {
          name: (<HTMLInputElement>document.getElementById("swal-petName")).value,
          comment: (<HTMLInputElement>document.getElementById("swal-petComment")).value,
          walks: []
        };
      }
    });
    if ( formValues ) {
      this.onSavePet( formValues );
    }
  }

  async getWalksPrecios() {
    const originalValues = { ...this.walksPrice };

    const { value: formValues } = await Swal.fire({
      title: "Editar Precios",
      html: `
        <label for="swal-oneDay"> 1 día </label>
        <input id="swal-oneDay" class="modal-input" type="number" placeholder="0" value="${this.walksPrice.oneDay}">
        <label for="swal-threeDays"> 3 días </label>
        <input id="swal-threeDays" class="modal-input" type="number" placeholder="0" value="${this.walksPrice.threeDays}">
        <label for="swal-fourDays"> 4 días </label>
        <input id="swal-fourDays" class="modal-input" type="number" placeholder="0" value="${this.walksPrice.fourDays}">
        <label for="swal-fiveDays"> 5 días </label>
        <input id="swal-fiveDays" class="modal-input" type="number" placeholder="0" value="${this.walksPrice.fiveDays}">
        `,
      focusConfirm: false,
      confirmButtonText: "Guardar",
      customClass: {
        confirmButton: "primary-btn",
        cancelButton: "primary-btn"
      },
      preConfirm: () => {
        return {
          oneDay: parseInt((<HTMLInputElement>document.getElementById("swal-oneDay")).value) || 0,
          threeDays: parseInt((<HTMLInputElement>document.getElementById("swal-threeDays")).value) || 0,
          fourDays: parseInt((<HTMLInputElement>document.getElementById("swal-fourDays")).value) || 0,
          fiveDays: parseInt((<HTMLInputElement>document.getElementById("swal-fiveDays")).value) || 0,
        };
      }
    });
    if ( formValues ) {
      if ( originalValues.oneDay === formValues.oneDay && originalValues.threeDays === formValues.threeDays &&
           originalValues.fourDays === formValues.fourDays && originalValues.fiveDays === formValues.fiveDays ) {

        return;

      } else {

        this.onSaveWalksPrice( formValues );

      }
    }
  }
}
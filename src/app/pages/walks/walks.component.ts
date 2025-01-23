import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pet } from 'src/app/core/interfaces/pet.interface';
import { WalksPrice } from 'src/app/core/interfaces/walks-price.interface';
import { AuthService, WalksService } from 'src/app/core/services';
import { EditIconComponent } from 'src/app/shared/components/Icons';
import { PlusIconComponent } from 'src/app/shared/components/Icons/plus-icon.component';
import { WalkCardComponent } from 'src/app/shared/components/walk-card/walk-card.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-walks',
  standalone: true,
  imports: [
    WalkCardComponent,
    ReactiveFormsModule,
    PlusIconComponent,
    EditIconComponent
   ],
  templateUrl: './walks.component.html',
  styleUrl: './walks.component.scss'
})
export class WalksComponent implements OnInit {

  private readonly walkService = inject( WalksService );
  private readonly authService = inject( AuthService );
  private readonly fb          = inject( FormBuilder );

  public allPets: Pet[];
  public walksPrice: WalksPrice;

  constructor() {
    this.allPets = [];
    this.walksPrice = {
      oneDay: 0,
      threeDays: 0,
      fourDays: 0,
      fiveDays: 0
    };
  }

  ngOnInit(): void {
    this.loadPets();
    this.loadWalksPrice();
  }

  loadPets() {
    this.walkService.findAllPets( this.authService.currentUser()!._id ).subscribe( pets => this.allPets = pets );
  }

  loadWalksPrice() {
    this.walkService.findWalksPrice( this.authService.currentUser()!._id ).subscribe( walksPrice => this.walksPrice = walksPrice )
  }

  onSavePet( formValue: Pet ): void {
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
          },
          didClose: () => window.scrollTo({ top: 0 })
        });
      },
      complete: () => {
        this.loadPets();
      },
      error: (message) => {
        Swal.fire({
          title: 'Error',
          text: message,
          icon: 'error'
        });
      }
    });
  }

  onSaveWalksPrice( formValue: WalksPrice ): void {
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
          },
          didClose: () => window.scrollTo({ top: 0 })
        });
      },
      complete: () => {
        this.loadWalksPrice();
      },
      error: (message) => {
        Swal.fire({
          title: 'Error',
          text: message,
          icon: 'error'
        });
      }
    });
  }

  petDeleted(): void {
    this.loadPets();
  }

  async addPet() {
    const { value: formValues } = await Swal.fire({
      title: "Agregar Mascota",
      html: `
        <label for="swal-petName">Nombre: </label>
        <input id="swal-petName" type="text" placeholder="Nombre Mascota">
        <label for="swal-petComment">Comentario: </label>
        <input id="swal-petComment" type="text" placeholder="Comentario">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: (<HTMLInputElement>document.getElementById("swal-petName")).value,
          comment: (<HTMLInputElement>document.getElementById("swal-petComment")).value,
          walks: ['']
        };
      }
    });
    if ( formValues ) {
      this.onSavePet( formValues );
    }
  }

  async getWalksPrecios() {
    const { value: formValues } = await Swal.fire({
      title: "Editar Precios",
      html: `
        <label for="swal-oneDay">1 día: </label>
        <input id="swal-oneDay" type="number" placeholder="0" value="${this.walksPrice.oneDay}">
        <label for="swal-threeDays">3 días: </label>
        <input id="swal-threeDays" type="number" placeholder="0" value="${this.walksPrice.threeDays}">
        <label for="swal-fourDays">4 días: </label>
        <input id="swal-fourDays" type="number" placeholder="0" value="${this.walksPrice.fourDays}">
        <label for="swal-fiveDays">5 días: </label>
        <input id="swal-fiveDays" type="number" placeholder="0" value="${this.walksPrice.fiveDays}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        console.log(this.walksPrice.oneDay);
        return {
          oneDay: parseInt((<HTMLInputElement>document.getElementById("swal-oneDay")).value) || 0,
          threeDays: parseInt((<HTMLInputElement>document.getElementById("swal-threeDays")).value) || 0,
          fourDays: parseInt((<HTMLInputElement>document.getElementById("swal-fourDays")).value) || 0,
          fiveDays: parseInt((<HTMLInputElement>document.getElementById("swal-fiveDays")).value) || 0,
        };
      }
    });
    if ( formValues ) {
      this.onSaveWalksPrice( formValues);
    }
  }
}
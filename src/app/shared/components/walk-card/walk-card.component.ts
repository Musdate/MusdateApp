import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pet, Walk } from 'src/app/core/interfaces/pet.interface';
import { WalksPrice } from 'src/app/core/interfaces/walks-price.interface';
import { AuthService, WalksService } from 'src/app/core/services';
import Swal from 'sweetalert2';
import { CheckIconComponent, DeleteIconComponent, WalksIconComponent, DollarIconComponent, PdfIconComponent, EditIconComponent } from '../Icons';
import generatePDF from '../libs/walks-pdf';

@Component({
  selector: 'app-walk-card',
  standalone: true,
  imports: [
    CheckIconComponent,
    DeleteIconComponent,
    DollarIconComponent,
    WalksIconComponent,
    EditIconComponent,
    PdfIconComponent,
    CurrencyPipe,
    CommonModule
   ],
  templateUrl: './walk-card.component.html',
  styleUrl: './walk-card.component.scss'
})
export class WalkCardComponent {

  @Input() public pet!: Pet;
  @Input() public walksPrice!: WalksPrice;

  @Output() reloadPets = new EventEmitter<void>();

  private readonly walkService = inject( WalksService );
  private readonly authService = inject( AuthService );

  public cardExpanded: boolean;
  public todayDate: string;
  public isCheckedButton: boolean;

  constructor() {
    this.cardExpanded = false;
    this.todayDate = '';
    this.isCheckedButton = false;
  }

  toggleData(): void {
    this.cardExpanded = !this.cardExpanded;
  }

  deletePet( id: string, name: string ): void {

    Swal.fire({
      position: 'center',
      title: `¿Estás seguro que deseas eliminar a ${ name }?`,
      icon: 'warning',
      timerProgressBar: true,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showClass: {
        popup: `animate__animated animate__fadeIn`
      }
    }).then(( result ) => {
      if ( result.isConfirmed ) {

        this.walkService.deletePet( id ).subscribe({
          next: () => {
            Swal.fire({
              position: 'top-end',
              title: `Eliminaste a ${ name }!`,
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
            this.reloadPets.emit();
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
    });
  }

  addWalkPet(): void {
    let today = new Date();
    this.todayDate = `${ today.getDate() < 10 ? '0' + today.getDate() : today.getDate() }-${ (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1) }-${ today.getFullYear() }`;

    for ( let walk of this.pet.walks ) {
      if ( this.todayDate == walk.date ) {
        Swal.fire({
          position: 'top-end',
          title: `Ya has paseado a ${ this.pet.name } hoy!!`,
          icon: 'warning',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          showClass: {
            popup: `animate__animated animate__fadeIn`
          }
        });
        return;
      }
    }

    const addWalkData = {
      date: this.todayDate,
      isNewWeek: false,
      paid: false
    }

    this.walkService.addWalk( this.pet._id, addWalkData ).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          title: `Has paseado a ${ this.pet.name }!!`,
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          showClass: {
            popup: `animate__animated animate__fadeIn`
          }
        });
      },
      complete: () => {
        this.reloadPets.emit();
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

  public payWalks() {

    this.pet.walks.forEach(( walk ) => {
      if ( walk.clicked ) {
        walk.paid = true;
      }
    });

    const updatePetData = {
      walks: this.pet.walks.map( ({ clicked, ...rest }) => rest )
    }

    this.walkService.updatePet( this.pet._id, updatePetData ).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          title: `Pagos pendientes actualizados.`,
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          showClass: {
            popup: `animate__animated animate__fadeIn`
          }
        });
      },
      complete: () => {
        this.reloadPets.emit();
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

  public exportPdf(): void {
    const pet = this.pet;
    generatePDF( pet, this.authService.currentUser()!.name );
  }

  public toggleClickWalk( walk: Walk ): void {
    walk.clicked = !walk.clicked;
    this.isCheckedButton = walk.clicked ? this.pet.walks.every(( walk ) => walk.paid || walk.clicked ) : false;
  }

  public toogleChecked(): void {
    this.isCheckedButton = !this.isCheckedButton;

    this.pet.walks.forEach(( walk ) => {
      if ( !walk.paid ) {
        walk.clicked = this.isCheckedButton;
      }
    });
  }
}
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pet } from 'src/app/core/interfaces/pet.interface';
import { WalksService } from 'src/app/core/services';
import Swal from 'sweetalert2';
import { CheckIconComponent, DeleteIconComponent } from '../Icons';

@Component({
  selector: 'app-walk-card',
  standalone: true,
  imports: [
    CheckIconComponent,
    DeleteIconComponent
   ],
  templateUrl: './walk-card.component.html',
  styleUrl: './walk-card.component.scss'
})
export class WalkCardComponent {

  @Input()
  public pet!: Pet;

  @Output()
  petDeleted = new EventEmitter<void>();

  private readonly walkService = inject( WalksService );

  public cardExpanded: boolean;
  public todayDate: string;

  constructor() {
    this.cardExpanded = false;
    this.todayDate = '';
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showClass: {
        popup: `animate__animated animate__fadeIn`
      },
      didClose: () => window.scrollTo({ top: 0 })
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
            this.petDeleted.emit();
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

  walkPet(): void {
    let today = new Date();
    this.todayDate = `${ today.getDate() < 10 ? '0' + today.getDate() : today.getDate() }-${ (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1) }-${ today.getFullYear() }`;

    for ( let walk of this.pet.walks ) {
      if ( this.todayDate == walk ) {
        Swal.fire({
          position: 'top-end',
          title: `Ya has paseado a ${ this.pet.name } hoy!!`,
          icon: 'warning',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          showClass: {
            popup: `animate__animated animate__fadeIn`
          },
          didClose: () => window.scrollTo({ top: 0 })
        });
        return;
      }
    }

    this.walkService.addWalk( this.pet._id, this.todayDate ).subscribe({
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
          },
          didClose: () => window.scrollTo({ top: 0 })
        });
      },
      complete: () => {
        this.petDeleted.emit();
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
}
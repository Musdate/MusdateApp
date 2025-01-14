import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pet } from 'src/app/core/interfaces/pet.interface';
import { WalksService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-walk-card',
  standalone: true,
  imports: [],
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

  constructor() {
    this.cardExpanded = false;
  }

  toggleData(): void {
    this.cardExpanded = !this.cardExpanded;
  }

  deletePet( id: string, name: string ) {

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
}
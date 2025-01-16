import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pet } from 'src/app/core/interfaces/pet.interface';
import { WalksService } from 'src/app/core/services';
import { WalkCardComponent } from 'src/app/shared/components/walk-card/walk-card.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-walks',
  standalone: true,
  imports: [ WalkCardComponent, ReactiveFormsModule ],
  templateUrl: './walks.component.html',
  styleUrl: './walks.component.scss'
})
export class WalksComponent implements OnInit {

  private readonly walkService = inject( WalksService );
  private readonly fb          = inject( FormBuilder );

  public allPets: Pet[];

  public petForm: FormGroup = this.fb.group({
    name: ['', [], []],
    comment: ['', [], []],
    walks: [[''], [], []]
  });

  constructor() {
    this.allPets = [];
  }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.walkService.findAllPets().subscribe( pets => this.allPets = pets );
  }

  onSave( formValue: Pet ): void {
    this.walkService.onSave( formValue ).subscribe({
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
        this.petForm.reset({
          name: '',
          comment: '',
          walks: ['']
        });
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
    if (formValues) {
      this.onSave(formValues);
    }
  }
}
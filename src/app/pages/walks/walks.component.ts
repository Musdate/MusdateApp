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
    type: ['', [], []],
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

  onSave(): void {
    this.walkService.onSave(this.petForm.value).subscribe({
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

  petDeleted(): void {
    this.loadPets();
  }
}
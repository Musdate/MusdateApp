import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isValid, parse } from 'date-fns';
import { Pet, UpdatePet, Walk } from 'src/app/core/interfaces/pet.interface';
import { WalksPrice } from 'src/app/core/interfaces/walks-price.interface';
import { AuthService, WalksService } from 'src/app/core/services';
import Swal from 'sweetalert2';
import { CheckIconComponent, DeleteIconComponent, DollarIconComponent, EditIconComponent, PdfIconComponent, PlusIconComponent, WalksIconComponent } from '../Icons';
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
    PlusIconComponent,
    CurrencyPipe,
    CommonModule,
    ReactiveFormsModule
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
  private readonly fb          = inject( FormBuilder );

  public cardExpanded: boolean;
  public todayDate: string;
  public isCheckedButton: boolean;
  public editWalks: boolean;
  public walkForm: FormGroup;

  constructor() {
    this.cardExpanded = false;
    this.todayDate = '';
    this.isCheckedButton = false;
    this.editWalks = false;
    this.walkForm = this.fb.group({
      walks: this.fb.array([])
    });
  }

  toggleData(): void {
    this.cardExpanded = !this.cardExpanded;
  }

  deletePet(): void {

    Swal.fire({
      position: 'center',
      title: `¿Estás seguro que deseas eliminar a ${ this.pet.name }?`,
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

        this.walkService.deletePet( this.pet._id ).subscribe({
          next: () => {
            Swal.fire({
              position: 'top-end',
              title: `Eliminaste a ${ this.pet.name }!`,
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
          error: ( message ) => {
            Swal.fire({
              title: 'Error',
              text: message.error.message,
              icon: 'error'
            });
          }
        });
      }
    });
  }

  get walks() {
    return this.walkForm.get('walks') as FormArray;
  }

  private loadWalks() {
    this.pet.walks.forEach(( walk ) => {
      this.walks.push( this.createWalkForm( walk ) );
    });
  }

  private createWalkForm( walk: Walk ): FormGroup {
    return this.fb.group({
      date: [ walk.date, [ Validators.required, this.dateFormatValidator() ]],
      paid: [ walk.paid ]
    });
  }

  public addWalkForm(){
    const newWalk = { date: '', paid: false, isNewWeek: false };
    this.walks.push( this.createWalkForm( newWalk ) );
  }

  public removeWalk( index: number ) {
    this.walks.removeAt( index );
  }

  public saveWalks() {

    if ( this.walkForm.pristine ) {
      this.toggleEditWalks();
      return;
    }

    this.pet.walks = this.walkForm.value.walks;

    const editPetData = {
      name: this.pet.name,
      comment: this.pet.comment,
      walks: this.pet.walks
    }

    this.onEditPet( editPetData );
    this.toggleEditWalks();
  }

  public async editPet() {

    const { value: formValues } = await Swal.fire({
      title: "Editar Mascota",
      html: `
        <label for="swal-petName"> Nombre </label>
        <input id="swal-petName" class="modal-input" type="text" placeholder="Nombre Mascota" value="${ this.pet.name }">
        <label for="swal-petComment"> Comentario </label>
        <input id="swal-petComment" class="modal-input" type="text" placeholder="Comentario" value="${ this.pet.comment }">
      `,
      focusConfirm: false,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        return {
          name: (<HTMLInputElement>document.getElementById("swal-petName")).value,
          comment: (<HTMLInputElement>document.getElementById("swal-petComment")).value,
          walks: this.pet.walks
        };
      }
    });
    if ( formValues ) {
      this.onEditPet( formValues );
    }
  }

  public toggleEditWalks() {
    this.editWalks = !this.editWalks;
    this.walkForm.reset();
    this.walks.clear();
    this.loadWalks();
  }

  onEditPet( formValue: UpdatePet ): void {
    this.walkService.updatePet( this.pet._id, formValue ).subscribe({
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
      complete: () => {
        this.reloadPets.emit();
      },
      error: ( message ) => {
        Swal.fire({
          title: 'Error',
          text: message.error.message,
          icon: 'error'
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
      error: ( message ) => {
        Swal.fire({
          title: 'Error',
          text: message.error.message,
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
      error: ( message ) => {
        Swal.fire({
          title: 'Error',
          text: message.error.message,
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

  private dateFormatValidator(): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {

      if (!control.value) {
        return null;
      }

      const date = parse( control.value, 'dd-MM-yyyy', new Date() );
      return isValid( date ) ? null : { invalidDateFormat: { value: control.value } };
    };
  }
}
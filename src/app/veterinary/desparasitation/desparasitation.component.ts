import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from 'src/app/models/animals';
import { Desparasitation } from 'src/app/models/desparasitation';
import { AnimalsService } from 'src/app/services/animals.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-desparasitation',
  templateUrl: './desparasitation.component.html',
  styleUrls: ['./desparasitation.component.css']
})
export class DesparasitationComponent {
  animals: Animal[] = [];
  desparasitationType: string[] = ["Internal", "External", "Both", "Intensive"];
  formulario: FormGroup;

  @ViewChild('confirmationToast') confirmationToast: any;

  constructor(private animalsService: AnimalsService, private veterinaryService: VeterinaryService) {
    this.formulario = new FormGroup({
      animal: new FormControl(),
      desparasitationType: new FormControl(),
      desparasitationDate: new FormControl(),

    })
  }

  ngOnInit(): void {
    this.animalsService.getAnimals().subscribe(animals => {
      this.animals = animals;
    })
  }

  onSubmit() {
    let desparasitation: Desparasitation = {
      id: this.formulario.value.animal.chip_number + '-' + this.formulario.value.desparasitationType + '-' + this.formulario.value.desparasitationDate,
      animal: this.formulario.value.animal,
      desparasitationType: this.formulario.value.desparasitationType,
      desparasitationDate: this.formulario.value.desparasitationDate
    };
    this.veterinaryService.addDesparasitation(desparasitation);
    this.formulario.reset();
    this.confirmationToast.nativeElement.classList.add('show');
      setTimeout(() => {
        this.confirmationToast.nativeElement.classList.remove('show');
      }, 3000);
  }
}

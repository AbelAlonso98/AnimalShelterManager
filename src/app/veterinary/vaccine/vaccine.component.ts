import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent {
  animals: Animal[] = [];
  vaccineTypes: string[] = ["Rabies", "Pentavalent", "Puppy", "Leptospirosis"];
  formulario: FormGroup;

  constructor(private animalsService: AnimalsService, private veterinaryService: VeterinaryService) {
    this.formulario = new FormGroup({
      animal: new FormControl(),
      vaccineType: new FormControl(),
      vaccineDate: new FormControl(),
      expirationDate: new FormControl()

    })
   }

  ngOnInit(): void {
    this.animalsService.getAnimals().subscribe(animals => {
      this.animals = animals;
    })
  }

  onSubmit(){
    let vaccine = {
      id: this.formulario.value.animal.chip_number + '-' + this.formulario.value.vaccineType + '-' + this.formulario.value.vaccineDate,
      animal: this.formulario.value.animal,
      vaccineType: this.formulario.value.vaccineType,
      vaccineDate: this.formulario.value.vaccineDate,
      expirationDate: this.formulario.value.expirationDate,
    }
    this.veterinaryService.addVaccine(vaccine)
  }


}

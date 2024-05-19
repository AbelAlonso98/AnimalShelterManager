import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent {
  animals: Animal[] = [];
  vaccineTypes: string[] = ["Rabies", "Pentavalent", "Puppy", "Leptospirosis"];
  formulario: FormGroup;

  constructor(private animalsService: AnimalsService) {
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
    console.log(this.formulario.value)

  }


}

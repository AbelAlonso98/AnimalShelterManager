import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adopter } from 'src/app/models/adopter';
import { Animal } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';
import { AdoptersService } from 'src/app/services/adopters.service';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent {
  formulario: FormGroup;
  animalID: string = "";
  animal: Animal = { 'name': "", 'species': "", 'chip_number': "" , 'id': ""}
  adopter: Adopter = {name: "", surname: "", nif: "" }

  constructor(private animalsService: AnimalsService, private adoptersService: AdoptersService, private router: Router, private route: ActivatedRoute) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      nif: new FormControl()
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.animalID = params["id"];
      }
    );

    if (this.animalID != undefined) {
      this.animalsService.getAnimal(this.animalID).then((animalData: Animal) => {
        this.animal = animalData;
        this.animal.id = this.animalID;

      }).catch(error => {
        this.router.navigate(['/animals']);
      })

    }
  }

  async onSubmit() {
    this.adopter = this.formulario.value;
    await this.adoptersService.addAdopter(this.adopter)
    await this.adoptersService.addAdoption(this.adopter, this.animal)
    await this.animalsService.deleteAnimal(this.animal)
    this.router.navigate(['/animals']);

  }
}

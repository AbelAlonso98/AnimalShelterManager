import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Animal } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animals-form',
  templateUrl: './animals-form.component.html',
  styleUrls: ['./animals-form.component.css']
})
export class AnimalsFormComponent {

  @HostBinding('class') classes = 'row'

  formulario: FormGroup;
  animalID: string = "";
  action: string = "Send";
  animal: Animal = { 'name': "", 'species': "", 'chip_number': "" }

  constructor(private animalsService: AnimalsService, private router: Router, private route: ActivatedRoute) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      species: new FormControl(),
      chip_number: new FormControl(),

    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.animalID = params["id"];
      }
    );

    if (this.animalID != undefined) {
      this.action = "Update";
      this.animalsService.getAnimal(this.animalID).then((animalData: Animal) => {
        this.animal = animalData;
        this.formulario.patchValue({
          name: this.animal.name,
          species: this.animal.species,
          chip_number: this.animal.chip_number
        })

      }).catch(error => {
        this.router.navigate(['/animals']);
      })

    }
  }

  async onSubmit() {
    if (this.animalID != undefined) {
      await this.animalsService.updateAnimal(this.formulario.value);
      this.router.navigate(['/animals']);
    }
    else {
      await this.animalsService.addAnimal(this.formulario.value);
      this.router.navigate(['/animals']);
    }

  }

}

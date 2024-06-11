import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  action: string = "Create";
  animal: Animal = {
    name: "",
    species: "",
    chip_number: "",
    kennel: '',
    birth_date: new Date(),
    entry_date: new Date(),
    passport: '',
    neutered: false,
    ppp: false
  }

  constructor(private animalsService: AnimalsService, private router: Router, private route: ActivatedRoute) {
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      species: new FormControl('', [Validators.required]),
      chip_number: new FormControl('', [Validators.required]),
      kennel: new FormControl(),
      birth_date: new FormControl('', [Validators.required]),
      entry_date: new FormControl('', [Validators.required]),
      passport: new FormControl(),
      neutered: new FormControl(),
      ppp: new FormControl(),

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
          chip_number: this.animal.chip_number,
          passport: this.animal.passport,
          birth_date: this.animal.birth_date,
          entry_date: this.animal.entry_date,
          kennel: this.animal.kennel,
          neutered: this.animal.neutered,
          ppp: this.animal.ppp
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

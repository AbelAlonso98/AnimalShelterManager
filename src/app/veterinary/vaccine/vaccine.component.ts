import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  animalID: string = "";
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

  @ViewChild('confirmationToast') confirmationToast: any;

  constructor(private animalsService: AnimalsService, private veterinaryService: VeterinaryService,private router: Router, private route: ActivatedRoute) {
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

    this.route.params.subscribe(
      params => {
        this.animalID = params["id"];
      }
    );

    if (this.animalID != undefined) {
      this.animalsService.getAnimal(this.animalID).then((animalData: Animal) => {
        this.animal = animalData;
        console.log(this.animal)
        this.formulario.patchValue({
          animal: this.animal
        })

      }).catch(error => {
        this.router.navigate(['/animals']);
      })

    }
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
    this.formulario.reset()
    this.confirmationToast.nativeElement.classList.add('show');
      setTimeout(() => {
        this.confirmationToast.nativeElement.classList.remove('show');
      }, 3000);
  }


}

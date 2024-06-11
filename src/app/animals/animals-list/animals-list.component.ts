import { Component, ViewChild } from '@angular/core';
import { Animal } from 'src/app/models/animals';
import { Desparasitation } from 'src/app/models/desparasitation';
import { Vaccine } from 'src/app/models/vaccine';
import { AnimalsService } from 'src/app/services/animals.service';
import { AuthService } from 'src/app/services/auth.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';


@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent {
  animals: Animal[] = []
  vaccines: Vaccine[] = []
  desparasitations: Desparasitation[] = []
  selectedAnimal: Animal = {
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

  isCollapsed: boolean[] = []
  isModalOpen: boolean = false

  @ViewChild('deleteToast') deleteToast: any;

  constructor(
    private animalsService: AnimalsService,
    private veterinaryService: VeterinaryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.animalsService.getAnimals().subscribe(animals => {
      this.animals = animals;
      this.isCollapsed = new Array(this.animals.length).fill(true);
    })

  }

  async onClickDelete(animal: Animal) {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      const response = await this.animalsService.deleteAnimal(animal);
      this.deleteToast.nativeElement.classList.add('show');
      setTimeout(() => {
        this.deleteToast.nativeElement.classList.remove('show');
      }, 3000);
    }
  }


  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  openModal(animal: Animal) {
    this.veterinaryService.getVaccinesByAnimalId(animal.chip_number).then(vaccines => {
      this.veterinaryService.getDesparasitationsByAnimalId(animal.chip_number).then(desparasitations => {
        this.selectedAnimal = animal;
        this.desparasitations = desparasitations;
        this.vaccines = vaccines;
        this.isModalOpen = true;
      })
    }).catch(error => {
      console.error('Error loading vaccines:', error)
    })
  }

  closeModal() {
    this.isModalOpen = false;
  }

  get role(): string {
    return this.authService.role;
  }
}

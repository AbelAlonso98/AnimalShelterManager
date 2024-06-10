import { Component, ViewChild } from '@angular/core';
import { Animal } from 'src/app/models/animals';
import { Vaccine } from 'src/app/models/vaccine';
import { AnimalsService } from 'src/app/services/animals.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent {
  animals: Animal[] = []
  vaccines: Vaccine[] = []

  isCollapsed: boolean[] = []

  @ViewChild('deleteToast') deleteToast: any;
  @ViewChild('vetModal') vetModal: any;

  constructor(private animalsService: AnimalsService, private veterinaryService: VeterinaryService) { }

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

  openModal(animalID: string) {
    // this.vaccines = this.veterinaryService.getVaccinesByAnimalId(animalID)
    this.vetModal.nativeElement.show();
  }

  closeModal() {
    this.vetModal.nativeElement.hide();
  }
}

import { Component } from '@angular/core';
import { Animal } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent {
  animals: Animal[] = [
    { name: "Asia", species: "Canina", chip_number: "1234" },
    { name: "Hera", species: "Felina", chip_number: "5678" }
  ]

  constructor(private animalsService: AnimalsService) { }

  ngOnInit(): void {
    this.animalsService.getAnimals().subscribe(animals => {
      this.animals = animals;
    })
  }
}

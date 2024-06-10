import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animals-list-row',
  templateUrl: './animals-list-row.component.html',
  styleUrls: ['./animals-list-row.component.css']
})
export class AnimalsListRowComponent {

  @Input() animal: Animal = {
    name: "DefaultName", species: "DefaultSpecies", chip_number: "0000",
    kennel: '',
    birth_date: new Date(),
    entry_date: new Date(),
    passport: '',
    neutered: false,
    ppp: false
  }

  isHovered: boolean = false;
  isCollapsed: boolean = true;
  select: boolean = false;

  constructor(private animalService: AnimalsService, private router: Router) { 
    if(router.url == '/animals/selectAnimal'){
      this.select = true;
    }
  }

  async onClickDelete() {
    const response = await this.animalService.deleteAnimal(this.animal);
  }

  onClick() {
    if(this.select){
      this.router.navigate(['./adoption', this.animal.id])
    }
    else{
      this.router.navigate(['./add', this.animal.id])
    }

  }

  setHovered(value: boolean) {
    this.isHovered = value;
  }

  onClickAction(){
    console.log(this.router.url)
    this.isCollapsed = !this.isCollapsed
  }

}

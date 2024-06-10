import { Component, OnInit } from '@angular/core';
import { Adoption } from 'src/app/models/adoption';
import { AdoptersService } from 'src/app/services/adopters.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {

  adoptions: Adoption[] = []

  constructor(private adopterService: AdoptersService) { }

  ngOnInit(): void {
    this.adopterService.getAdoptions().subscribe(adoptions => {
      this.adoptions = adoptions
    }
    )
  }

}

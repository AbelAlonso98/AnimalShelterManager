import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalsListComponent } from './animals-list/animals-list.component';
import { AnimalsFormComponent } from './animals-form/animals-form.component';
import { AnimalsListRowComponent } from './animals-list-row/animals-list-row.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';


@NgModule({
  declarations: [
    AnimalsListComponent,
    AnimalsFormComponent,
    AnimalsListRowComponent,
    AdoptionFormComponent,
  ],
  imports: [
    CommonModule,
    AnimalsRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    AnimalsListComponent
  ]
})
export class AnimalsModule { }

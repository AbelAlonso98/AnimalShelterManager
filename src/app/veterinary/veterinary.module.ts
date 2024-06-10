import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinaryRoutingModule } from './veterinary-routing.module';
import { VetMenuComponent } from './vet-menu/vet-menu.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { AnimalsModule } from '../animals/animals.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DesparasitationComponent } from './desparasitation/desparasitation.component';


@NgModule({
  declarations: [
    VetMenuComponent,
    VaccineComponent,
    DesparasitationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VeterinaryRoutingModule,
    AnimalsModule
  ]
})
export class VeterinaryModule { }

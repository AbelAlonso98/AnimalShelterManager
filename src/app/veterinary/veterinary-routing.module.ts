import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VetMenuComponent } from './vet-menu/vet-menu.component';
import { VaccineComponent } from './vaccine/vaccine.component';

const routes: Routes = [
  {
    path: '', component: VetMenuComponent
  },
  {
    path: 'vaccine', component: VaccineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinaryRoutingModule { }

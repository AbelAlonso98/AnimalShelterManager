import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VetMenuComponent } from './vet-menu/vet-menu.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { DesparasitationComponent } from './desparasitation/desparasitation.component';

const routes: Routes = [
  {
    path: '', component: VetMenuComponent,
    children: [
      { path: 'vaccine', component: VaccineComponent },
      { path: 'vaccine/:id', component: VaccineComponent },
      { path: 'desparasitation', component: DesparasitationComponent },
      { path: 'desparasitation/:id', component: DesparasitationComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinaryRoutingModule { }

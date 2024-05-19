import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsListComponent } from './animals-list/animals-list.component';
import { AnimalsFormComponent } from './animals-form/animals-form.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';

const routes: Routes = [
  {
    path: '', component: AnimalsListComponent,
    children: [
      {path: '', component: AnimalsListComponent},
      
    ]
  },
  {path: 'add', component: AnimalsFormComponent},

  {path: 'selectAnimal', component: AnimalsListComponent},
  
  {path: 'add/:id', component: AnimalsFormComponent},

  {path: 'adoption/:id', component: AdoptionFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }

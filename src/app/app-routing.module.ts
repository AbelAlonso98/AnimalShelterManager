import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing-page' },
  { path: 'landing-page', ...canActivate(() => redirectUnauthorizedTo(['/login'])), component: LandingPageComponent },
  {
    path: 'animals',
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    loadChildren: () => import('./animals/animals.module').then(m => m.AnimalsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'veterinary',
    loadChildren: () => import('./veterinary/veterinary.module').then(m => m.VeterinaryModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

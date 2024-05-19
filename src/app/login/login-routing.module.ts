import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: LoginFormComponent},
      {path: 'register', component: RegisterFormComponent},
      {
        path: 'users', 
        component: UsersListComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/login'])),}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

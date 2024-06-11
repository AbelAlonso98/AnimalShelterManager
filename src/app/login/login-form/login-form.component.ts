import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  formLogin: FormGroup;
  emailLogged: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    this.authService.login(this.formLogin.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['landing-page'])
    })
    .catch(error => console.log(error))
    this.emailLogged = this.formLogin.value.email;
  }
}

import { Component } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  formReg: FormGroup;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private firestore: Firestore
  ) {
    this.formReg = new FormGroup(
      {
        name: new FormControl(),
        surname: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        role: new FormControl(),
        adminPassword: new FormControl()
      }
    );
  }

  getAdminPw() {
    return getDoc(doc(this.firestore, `admin-password/4327`))
      .then((docSnapshot) => {
        let animalData = docSnapshot.data();
        if (animalData)
          return animalData['pw'];
      });

  }


  async onSubmit() {
    const user = {
      'email': this.formReg.value.email,
      'name': this.formReg.value.name,
      'surname': this.formReg.value.surname,
      'role': this.formReg.value.role,
      'id': ''
    }
    if (this.formReg.value.role == 'admin') {
      const adminpw = await this.getAdminPw();
      if (this.formReg.value.adminPassword != adminpw) { return }
    }

    this.authService.register(this.formReg.value)
      .then(async response => {
        user.id = response.user.uid;
        const responseUser = await this.usersService.addUser(user);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error))
  }



}


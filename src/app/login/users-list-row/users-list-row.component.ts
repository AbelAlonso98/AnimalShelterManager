import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list-row',
  templateUrl: './users-list-row.component.html',
  styleUrls: ['./users-list-row.component.css']
})
export class UsersListRowComponent {

  @Input() user: User = { email: "", name: "", surname: "", role: "" }

  constructor(private usersService: UsersService, private authService: AuthService) { }

  async onClickDelete(){
    let response = await this.usersService.deleteUser(this.user);
    console.log(response);
    response = await this.authService.delete(this.user)
    console.log(response);
  }



}

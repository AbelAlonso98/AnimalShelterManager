import { Component } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: User[] = []

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    })
  }

}

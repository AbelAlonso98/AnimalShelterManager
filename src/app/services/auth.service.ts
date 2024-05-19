import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where, getDocs } from '@angular/fire/firestore';

import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { User } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role: string = "";
  name: string = "";

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private auth: Auth, private usersService: UsersService, private firestore: Firestore) {
    this.getRole();
    this.getName();
    this.isLoggedInSubject.next(localStorage.getItem('user') !== 'null');
  }

  getRole() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const userJSON = JSON.parse(user);
      if (userJSON !== null && userJSON.email !== 'null') {
        this.usersService.getUserRoleByEmail(userJSON.email).then(role => this.role = role);
      }
    }
  }

  getName() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const userJSON = JSON.parse(user);
      if (userJSON !== null && userJSON.email !== 'null') {
        this.usersService.getUserNameByEmail(userJSON.email).then(name => this.name = name);
      }
    }
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const userJSON = JSON.parse(user);
      if (userJSON !== null && userJSON.email !== 'null') {
        this.usersService.getUserRoleByEmail(userJSON.email).then(role => this.role = role);
      }
    }
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(
        response => {
          localStorage.setItem('user', JSON.stringify(response['user']));
          this.isLoggedInSubject.next(true);
          this.usersService.getUserRoleByEmail(email).then(role => this.role = role);
          this.getRole();

        }
      ).catch(error => console.log(error));

  }

  logout() {
    return signOut(this.auth)
      .then(() => {
        localStorage.setItem('user', 'null');
        this.isLoggedInSubject.next(false);
        this.getRole();
      });
  }

  delete(user: User) {


  }

}

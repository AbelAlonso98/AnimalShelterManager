import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private firestore: Firestore) { }

  // There's no need to evaluate if the user already exists as the Firebase Authentication already makes that
  // for us.
  addUser(user: User) {
    setDoc(doc(this.firestore, 'users', user.email), user);
  }


  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>
  }

  deleteUser(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(userDocRef);
  }

  async getUserRoleByEmail(email: string): Promise<string> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q);
    const role: string[] = []
    querySnapshot.forEach(doc => {
      role.push(doc.data()['role'])
    })
    return role[0]
  }

  async getUserNameByEmail(email: string): Promise<string> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q);
    const name: string[] = []
    querySnapshot.forEach(doc => {
      name.push(doc.data()['name']+" "+doc.data()['surname'])
    })
    return name[0]
  }
}



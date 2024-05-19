import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Adopter } from '../models/adopter';
import { addDoc, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { Animal } from '../models/animals';

@Injectable({
  providedIn: 'root'
})
export class AdoptersService {

  constructor(private firestore: Firestore) { }


  // In this case we don't need to check if the adopter already exists because a single
  // adopter can adopt multiple times without that being a problem.
  async addAdopter(adopter: Adopter) {
    await getDoc(doc(this.firestore, 'adopters', adopter.nif)).then(d => {
      setDoc(doc(this.firestore, 'adopters', adopter.nif), adopter)
    })
  }

  async addAdoption(adopter: Adopter, animal: Animal) {
    let adoptionName = 'AD-' + adopter.nif + '-' + animal.chip_number
    await getDoc(doc(this.firestore, 'adoptions', adoptionName)).then(d => {
      if (d.exists()) {
        console.log('Ya existe esa adopcion');
      }
      else {
        setDoc(doc(this.firestore, 'adoptions', adoptionName), {
          adopter: adopter,
          animal: animal
        })
        setDoc(doc(this.firestore, 'in-out', 'O-' + animal.chip_number), {
          type: 'Out',
          animal: animal
        })
      }
    })
  }
}

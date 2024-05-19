import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, setDoc } from '@angular/fire/firestore';
import { Animal } from '../models/animals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(private firestore: Firestore) { }


  addAnimal(animal: Animal) {
    getDoc(doc(this.firestore, 'animals', animal.chip_number)).then(d => {
      if (d.exists()) {
        console.log('Ya existe ese animal');
      }
      else {
        setDoc(doc(this.firestore, 'animals', animal.chip_number), animal);
        setDoc(doc(this.firestore, 'in-out', 'I-' + animal.chip_number), {
          type: 'In',
          animal: animal
        });
      }
    })
  }

  getAnimals(): Observable<Animal[]> {
    const animalRef = collection(this.firestore, 'animals');
    return collectionData(animalRef, { idField: 'id' }) as Observable<Animal[]>
  }

  getAnimal(id: String): Promise<Animal> {
    const animalDocRef = doc(this.firestore, `animals/${id}`);
    return getDoc(animalDocRef)
      .then((docSnapshot) => {
        const animalData = docSnapshot.data() as Animal;
        return animalData;
      })
  }

  deleteAnimal(animal: Animal) {
    const animalDocRef = doc(this.firestore, `animals/${animal.id}`);
    return deleteDoc(animalDocRef);
  }

  updateAnimal(animal: Animal) {
    setDoc(doc(this.firestore, 'animals', animal.chip_number), animal)
  }
}

import { Injectable } from '@angular/core';
import { Vaccine } from '../models/vaccine';
import { Firestore, collection, query, where, doc, getDocs, updateDoc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Desparasitation } from '../models/desparasitation';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {

  constructor(private firestore: Firestore) { }


  addVaccine(vaccine: Vaccine) {
    getDoc(doc(this.firestore, 'vaccines', vaccine.id)).then(d => {
      if (d.exists()) {
        console.log('Ya existe esa vacuna');
      }
      else {
        setDoc(doc(this.firestore, 'vaccines', vaccine.id), vaccine);
      }
    })
  }

  addDesparasitation(desparasitation: Desparasitation) {
    getDoc(doc(this.firestore, 'desparasitations', desparasitation.id)).then(d => {
      if (d.exists()) {
        console.log('Ya existe esa desparasitación');
      }
      else {
        setDoc(doc(this.firestore, 'desparasitations', desparasitation.id), desparasitation);
      }
    })
  }

  getVaccine(id: String): Promise<Vaccine> {
    const vaccineDocRef = doc(this.firestore, `vaccines/${id}`);
    return getDoc(vaccineDocRef)
      .then((docSnapshot) => {
        const vaccineData = docSnapshot.data() as Vaccine;
        return vaccineData;
      })
  }

  getVaccinesByAnimalId(animalId: string): Promise<Vaccine[]> {
    const vaccinesRef = collection(this.firestore, 'vaccines');
    const q = query(vaccinesRef, where('animal.chip_number', '==', animalId));
    
    return getDocs(q)
      .then((querySnapshot) => {
        const vaccines: Vaccine[] = [];
        querySnapshot.forEach((doc) => {
          vaccines.push(doc.data() as Vaccine);
        });
        return vaccines;
      })
      .catch((error) => {
        console.error("Error getting vaccines: ", error);
        throw new Error("Error getting vaccines");
      });
  }

}


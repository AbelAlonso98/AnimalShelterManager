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

  getVaccinesByAnimalId(animalId: string): Promise<Vaccine[]> {
    const vaccinesRef = collection(this.firestore, 'vaccines');
    const q = query(vaccinesRef, where('animal.chip_number', '==', animalId));
    
    return getDocs(q)
      .then((querySnapshot) => {
        const vaccines: Vaccine[] = [];
        querySnapshot.forEach((doc) => {
          vaccines.push(doc.data() as Vaccine);
        });
        console.log(vaccines)
        return vaccines;
      })
      .catch((error) => {
        console.error("Error getting vaccines: ", error);
        throw new Error("Error getting vaccines");
      });
  }

  getDesparasitationsByAnimalId(animalId: string): Promise<Desparasitation[]> {
    const vaccinesRef = collection(this.firestore, 'desparasitations');
    const q = query(vaccinesRef, where('animal.chip_number', '==', animalId));
    
    return getDocs(q)
      .then((querySnapshot) => {
        const desparasitations: Desparasitation[] = [];
        querySnapshot.forEach((doc) => {
          desparasitations.push(doc.data() as Desparasitation);
        });
        return desparasitations;
      })
      .catch((error) => {
        console.error("Error getting desparasitations: ", error);
        throw new Error("Error getting desparasitations");
      });
  }

}


import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from 'src/app/models/animals';
import { Desparasitation } from 'src/app/models/desparasitation';
import { Vaccine } from 'src/app/models/vaccine';

@Component({
  selector: 'app-animal-vet-modal',
  templateUrl: './animal-vet-modal.component.html',
  styleUrls: ['./animal-vet-modal.component.css']
})
export class AnimalVetModalComponent {
  @Input() vaccines: Vaccine[] = [];
  @Input() desparasitations: Desparasitation[] = [];
  @Input() animal: Animal = {
    name: "",
    species: "",
    chip_number: "",
    kennel: '',
    birth_date: new Date(),
    entry_date: new Date(),
    passport: '',
    neutered: false,
    ppp: false
  };
  @Output() closeModal = new EventEmitter<void>();

  activeTab: string = 'vaccines';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onClose() {
    this.closeModal.emit();
  }

  isExpired(expirationDate: Date): boolean {
    const today = new Date();
    return expirationDate < today;
  }
}

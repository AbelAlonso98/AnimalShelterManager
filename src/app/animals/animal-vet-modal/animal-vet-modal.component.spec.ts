import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalVetModalComponent } from './animal-vet-modal.component';

describe('AnimalVetModalComponent', () => {
  let component: AnimalVetModalComponent;
  let fixture: ComponentFixture<AnimalVetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalVetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalVetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

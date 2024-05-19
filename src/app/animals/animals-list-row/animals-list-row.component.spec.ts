import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsListRowComponent } from './animals-list-row.component';

describe('AnimalsListRowComponent', () => {
  let component: AnimalsListRowComponent;
  let fixture: ComponentFixture<AnimalsListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalsListRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

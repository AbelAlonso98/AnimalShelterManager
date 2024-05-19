import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetMenuComponent } from './vet-menu.component';

describe('VetMenuComponent', () => {
  let component: VetMenuComponent;
  let fixture: ComponentFixture<VetMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

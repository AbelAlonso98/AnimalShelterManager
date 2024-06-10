import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesparasitationComponent } from './desparasitation.component';

describe('DesparasitationComponent', () => {
  let component: DesparasitationComponent;
  let fixture: ComponentFixture<DesparasitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesparasitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesparasitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

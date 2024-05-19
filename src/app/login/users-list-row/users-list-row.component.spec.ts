import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListRowComponent } from './users-list-row.component';

describe('UsersListRowComponent', () => {
  let component: UsersListRowComponent;
  let fixture: ComponentFixture<UsersListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

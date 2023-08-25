import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAllComponent } from './personnel-all.component';

describe('PersonnelAllComponent', () => {
  let component: PersonnelAllComponent;
  let fixture: ComponentFixture<PersonnelAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

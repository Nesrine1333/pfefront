import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceupdateComponent } from './competenceupdate.component';

describe('CompetenceupdateComponent', () => {
  let component: CompetenceupdateComponent;
  let fixture: ComponentFixture<CompetenceupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenceupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireInterventionComponent } from './formulaire-intervention.component';

describe('FormulaireInterventionComponent', () => {
  let component: FormulaireInterventionComponent;
  let fixture: ComponentFixture<FormulaireInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireInterventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

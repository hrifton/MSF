import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireMetierComponent } from './formulaire-metier.component';

describe('FormulaireMetierComponent', () => {
  let component: FormulaireMetierComponent;
  let fixture: ComponentFixture<FormulaireMetierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireMetierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireMetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

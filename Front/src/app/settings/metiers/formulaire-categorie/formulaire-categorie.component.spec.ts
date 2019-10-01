import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCategorieComponent } from './formulaire-categorie.component';

describe('FormulaireCategorieComponent', () => {
  let component: FormulaireCategorieComponent;
  let fixture: ComponentFixture<FormulaireCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

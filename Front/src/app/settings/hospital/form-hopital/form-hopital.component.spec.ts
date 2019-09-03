import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHopitalComponent } from './form-hopital.component';

describe('FormHopitalComponent', () => {
  let component: FormHopitalComponent;
  let fixture: ComponentFixture<FormHopitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHopitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

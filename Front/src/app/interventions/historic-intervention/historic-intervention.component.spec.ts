import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricInterventionComponent } from './historic-intervention.component';

describe('HistoricInterventionComponent', () => {
  let component: HistoricInterventionComponent;
  let fixture: ComponentFixture<HistoricInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricInterventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

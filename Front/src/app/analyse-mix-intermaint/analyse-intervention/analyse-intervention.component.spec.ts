import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseInterventionComponent } from './analyse-intervention.component';

describe('HistoricSolutionComponent', () => {
  let component: AnalyseInterventionComponent;
  let fixture: ComponentFixture<AnalyseInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseInterventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

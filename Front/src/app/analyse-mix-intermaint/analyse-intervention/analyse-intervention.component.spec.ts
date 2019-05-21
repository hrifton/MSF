import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseIntervention } from './analyse-intervention.component';

describe('HistoricSolutionComponent', () => {
  let component: AnalyseIntervention;
  let fixture: ComponentFixture<AnalyseIntervention>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseIntervention ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseIntervention);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

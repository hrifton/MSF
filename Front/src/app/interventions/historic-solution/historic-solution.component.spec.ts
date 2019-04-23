import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricSolutionComponent } from './historic-solution.component';

describe('HistoricSolutionComponent', () => {
  let component: HistoricSolutionComponent;
  let fixture: ComponentFixture<HistoricSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

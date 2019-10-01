import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionInterventionComponent } from './resolution-intervention.component';

describe('ResolutionInterventionComponent', () => {
  let component: ResolutionInterventionComponent;
  let fixture: ComponentFixture<ResolutionInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolutionInterventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolutionInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

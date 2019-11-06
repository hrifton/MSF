import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierTechComponent } from './calendrier-tech.component';

describe('CalendrierTechComponent', () => {
  let component: CalendrierTechComponent;
  let fixture: ComponentFixture<CalendrierTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

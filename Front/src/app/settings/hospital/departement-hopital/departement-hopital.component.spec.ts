import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementHopitalComponent } from './departement-hopital.component';

describe('DepartementHopitalComponent', () => {
  let component: DepartementHopitalComponent;
  let fixture: ComponentFixture<DepartementHopitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartementHopitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementHopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

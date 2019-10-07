import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetierHopitalComponent } from './metier-hopital.component';

describe('MetierHopitalComponent', () => {
  let component: MetierHopitalComponent;
  let fixture: ComponentFixture<MetierHopitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetierHopitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetierHopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

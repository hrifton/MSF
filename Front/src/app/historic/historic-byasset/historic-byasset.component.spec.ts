import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricByassetComponent } from './historic-byasset.component';

describe('HistoricByassetComponent', () => {
  let component: HistoricByassetComponent;
  let fixture: ComponentFixture<HistoricByassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricByassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricByassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

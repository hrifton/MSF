import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMetiersComponent } from './list-metiers.component';

describe('ListMetiersComponent', () => {
  let component: ListMetiersComponent;
  let fixture: ComponentFixture<ListMetiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMetiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMetiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

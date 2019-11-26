import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErrorForStatusComponent } from './page-error-for-status.component';

describe('PageErrorForStatusComponent', () => {
  let component: PageErrorForStatusComponent;
  let fixture: ComponentFixture<PageErrorForStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageErrorForStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErrorForStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

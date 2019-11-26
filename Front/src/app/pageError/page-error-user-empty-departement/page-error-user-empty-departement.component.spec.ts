import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErrorUserEmptyDepartementComponent } from './page-error-user-empty-departement.component';

describe('PageErrorUserEmptyDepartementComponent', () => {
  let component: PageErrorUserEmptyDepartementComponent;
  let fixture: ComponentFixture<PageErrorUserEmptyDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageErrorUserEmptyDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErrorUserEmptyDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

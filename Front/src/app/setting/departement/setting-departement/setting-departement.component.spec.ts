import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDepartementComponent } from './setting-departement.component';

describe('SettingDepartementComponent', () => {
  let component: SettingDepartementComponent;
  let fixture: ComponentFixture<SettingDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

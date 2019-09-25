/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SettingMetierComponent } from './setting-metier.component';

describe('SettingMetierComponent', () => {
  let component: SettingMetierComponent;
  let fixture: ComponentFixture<SettingMetierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingMetierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingMetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

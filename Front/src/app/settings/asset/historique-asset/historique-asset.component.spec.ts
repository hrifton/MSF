import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAssetComponent } from './historique-asset.component';

describe('HistoriqueAssetComponent', () => {
  let component: HistoriqueAssetComponent;
  let fixture: ComponentFixture<HistoriqueAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

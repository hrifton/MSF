import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyseMaintenanceComponent } from './analyse-maintenance.component';


describe('InterventionComponent', () => {
  let component: AnalyseMaintenanceComponent;
  let fixture: ComponentFixture<AnalyseMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AnalyseMixIntermaintComponent } from "./analyse-mix-inter-maint.component";

describe("HistoricInterventionComponent", () => {
  let component: AnalyseMixIntermaintComponent;
  let fixture: ComponentFixture<AnalyseMixIntermaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseMixIntermaintComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseMixIntermaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

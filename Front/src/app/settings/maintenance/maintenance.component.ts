import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChange
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { CheckBoxComponent } from "@syncfusion/ej2-angular-buttons";
import { MultiSelectComponent } from "@syncfusion/ej2-angular-dropdowns";
import { RecurrenceEditor } from "@syncfusion/ej2-angular-schedule";
import { MaintenanceService } from "../../Service/maintenance.service";
import * as moment from "moment";
import { Maintenance } from "../../Class/Maintenance";
import { MetierService } from "../../Service/metier.service";
import { Metier } from "src/app/Class/Metier";

@Component({
  selector: "app-maintenance",
  templateUrl: "./maintenance.component.html",
  styleUrls: ["./maintenance.component.css"]
})
export class MaintenanceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private ms: MaintenanceService,
    private mes: MetierService
  ) {}
  //#region Declaration Variable
  maintenances: Maintenance[];

  // date = new Date();

  periode: any;
  public listeMetier: any[];

  @Output() messageEvent = new EventEmitter<any>();

  maintenanceForm: FormGroup;

  // hasUnitNumber = false;

  @ViewChild("checkbox")
  public mulObj: MultiSelectComponent;
  @ViewChild("selectall")
  public checkboxObj: CheckBoxComponent;
  @ViewChild("dropdown")
  public dropdownObj: CheckBoxComponent;
  @ViewChild("select")
  public reorderObj: CheckBoxComponent;
  public mode: string;
  public filterPlaceholder: string;
  public lrepeat: { [key: string]: Object }[] = [
    { repeat: "Never" },
    { repeat: "Daily" },
    { repeat: "Weekly" },
    { repeat: "Monthly" },
    { repeat: "Yearly" }
  ];

  public lEnd: { [key: string]: Object }[] = [
    { end: "Never" },
    { end: "Until" },
    { end: "Count" }
  ];
  // define the data with category
  public days: { [key: string]: Object }[] = [
    { Name: "Monday", Code: "1" },
    { Name: "Tuesday", Code: "2" },
    { Name: "Wednesday", Code: "3" },
    { Name: "Thursday", Code: "4" },
    { Name: "Friday", Code: "5" },
    { Name: "Saturday", Code: "6" },
    { Name: "Sunday", Code: "0" }
  ];
  public currents: { [key: string]: Object }[] = [
    { Name: "First", Code: "1" },
    { Name: "Second", Code: "2" },
    { Name: "Third", Code: "3" },
    { Name: "Last", Code: "4" }
  ];
  public lMonth: { [key: string]: Object }[] = [
    { Name: "January", Code: 0 },
    { Name: "February", Code: 1 },
    { Name: "March", Code: 2 },
    { Name: "April", Code: 3 },
    { Name: "May", Code: 4 },
    { Name: "June", Code: 5 },
    { Name: "July", Code: 6 },
    { Name: "August", Code: 7 },
    { Name: "September", Code: 8 },
    { Name: "October", Code: 9 },
    { Name: "November", Code: 10 },
    { Name: "December", Code: 11 }
  ];
  // map the groupBy field with category column
  public checkFields: Object = { text: "Name", value: "Code" };
  // set the placeholder to the MultiSelect input
  public checkWaterMark = "Select Day(s)";
  // set the MultiSelect popup height
  public popHeight = "350px";
  //#endregion

  createForm() {
    this.maintenanceForm = this.fb.group({
      maintenance: new FormControl("", [Validators.required]),
      executor: new FormControl("", [Validators.required]),
      periodicity: new FormControl("", [Validators.required]),
      duration: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      interval: new FormControl("", [Validators.required])
    });
  }
  saveNewMaintenance(maintenance) {
    console.log(maintenance.value);
    this.ms.PostNewMaintenance(maintenance.value);
  }
  public onChange(args: SimpleChange): void {
    console.log(args);
  }

  ngOnInit() {
    this.mes.getMetiers().subscribe((data: Metier[]) => {
      this.listeMetier = data;
      console.log(this.listeMetier);
    });

    this.createForm();
    this.mode = "CheckBox";
    this.filterPlaceholder = "Select Day(s)";
  }
}

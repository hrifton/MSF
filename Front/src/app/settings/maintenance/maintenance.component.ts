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
import * as _ from "lodash";
import { Maintenance } from "../../Class/Maintenance";
import { MetierService } from "../../Service/metier.service";
import { Metier } from "src/app/Class/Metier";
import { UserService } from "src/app/Service/user.service";
import {
  SelectionSettingsModel,
  DataStateChangeEventArgs
} from "@syncfusion/ej2-angular-grids";
import { Observable } from "rxjs";

@Component({
  selector: "app-maintenance",
  templateUrl: "./maintenance.component.html",
  styleUrls: ["./maintenance.component.css"]
})
export class MaintenanceComponent implements OnInit {
  @Input() projet;
  @Input() metiers;
  @Input() listeMaintenanceDefault;
  @Output() saveMaintenance = new EventEmitter<Maintenance>();
  @Output() AddNewMaintenanceToHospital = new EventEmitter<Maintenance>();
  public data: Observable<DataStateChangeEventArgs> = this
    .listeMaintenanceDefault;
  public pageOptions: Object;
  public state: DataStateChangeEventArgs;
  listeMaintenance: Maintenance;
  subCat: any;
  public role: string = this.us.getStatus();

  constructor(
    private fb: FormBuilder,

    private us: UserService,
    private mes: MetierService
  ) {}
  //#region Declaration Variable
  maintenances: Maintenance[];

  // date = new Date();

  periode: any;
  public listeMetier: Metier[];

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
    { repeat: "Daily" },
    { repeat: "Weekly" },
    { repeat: "Monthly" },
    { repeat: "Yearly" }
  ];

  public lEnd: { [key: string]: Object }[] = [
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
  //public data: Maintenance[] = [];
  // map the groupBy field with category column
  public checkFields: Object = { text: "Name", value: "Code" };
  // set the placeholder to the MultiSelect input
  public checkWaterMark = "Select Day(s)";
  // set the MultiSelect popup height
  public popHeight = "350px";
  public selectionOptions: SelectionSettingsModel;
  //#endregion

  createForm(data?) {
    if (data) {
      console.log(data);
      this.maintenanceForm = this.fb.group({
        name: new FormControl(data.name ? data.name : "", [
          Validators.required
        ]),
        categorie: new FormControl(data.categorie ? data.categorie : "", [
          Validators.required
        ]),
        subCat: new FormControl(data.subCat ? data.subCat : "", [
          Validators.required
        ]),
        periodicity: new FormControl(data.periodicity ? data.periodicity : "", [
          Validators.required
        ]),
        description: new FormControl(data.description ? data.description : "", [
          Validators.required
        ]),
        choix: new FormControl(data.choix ? data.choix : ""),
        interval: new FormControl(data.interval ? data.interval : ""),
        recurrence: new FormControl(data.recurrence ? data.recurrence : ""),
        date: new FormControl(data.date ? data.date : ""),
        StartTime: new FormControl(data.StartTime ? data.StartTime : ""),
        count: new FormControl(data.count ? data.count : ""),
        until: new FormControl(data.until ? data.until : ""),
        end: new FormControl(data.end ? data.end : ""),
        codeBarre: new FormControl(data.codeBarre ? data.codeBarre : ""),
        listDay: new FormControl(data.listDay ? data.listDay : ""),
        dayOcc: new FormControl(data.dayOcc ? data.dayOcc : ""),
        current: new FormControl(data.current ? data.current : ""),
        day: new FormControl(data.day ? data.day : ""),
        month: new FormControl(data.month ? data.month : "")
      });
    } else {
      this.maintenanceForm = this.fb.group({
        name: new FormControl("", [Validators.required]),
        categorie: new FormControl("", [Validators.required]),
        subCat: new FormControl("", [Validators.required]),
        periodicity: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        choix: new FormControl("", [Validators.required]),
        interval: new FormControl("", [Validators.required]),
        recurrence: new FormControl(""),
        date: new FormControl(""),
        StartTime: new FormControl(""),
        count: new FormControl(""),
        until: new FormControl(""),
        end: new FormControl(""),
        codeBarre: new FormControl(""),
        listDay: new FormControl(""),
        dayOcc: new FormControl(""),
        current: new FormControl(""),
        day: new FormControl(""),
        month: new FormControl("")
      });
    }
  }
  createFormSuperAdmin() {
    this.maintenanceForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      categorie: new FormControl("", [Validators.required]),
      subCat: new FormControl("", [Validators.required]),
      periodicity: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      interval: new FormControl("", [Validators.required])
    });
  }

  addNewMaintenanceToHospital(maintenance) {
    this.AddNewMaintenanceToHospital.emit(maintenance.value);
  }

  rowSelected($event) {
    this.createForm($event.data);
  }
  saveNewMaintenance(maintenance) {
    this.saveMaintenance.emit(maintenance.value);
  }
  public onChange(args: any): void {
    console.log(args);
    if (args.itemData.categorie) {
      console.log(args.itemData.categorie);
      this.subCat = args.itemData.categorie;
    }

    if (args.itemData.maintenance != undefined) {
      this.onSelection(args.itemData);
    }
    if (null) {
      console.log(this.checkboxObj);
      this.mulObj.showSelectAll = this.checkboxObj.checked;
    }
  }
  /**
   * @param value
   * Value est la maintenance qui auto-completera le formulaire avec ces valeurs par defaut
   */
  onSelection(value) {
    this.periode = value.periodicity;
    this.maintenanceForm = this.fb.group({
      idMaintnance: new FormControl(value._id, [Validators.required]),
      maintenance: new FormControl(value.maintenance, [Validators.required]),
      executor: new FormControl(value.executor, [Validators.required]),
      periodicity: new FormControl("", [Validators.required]),
      recurrence: new FormControl("", [Validators.required]),
      description: new FormControl(value.description, [Validators.required]),
      StartTime: new FormControl("", [Validators.required]),
      count: new FormControl(""),
      until: new FormControl(""),
      listDay: new FormControl([]),
      end: new FormControl(""),
      interval: new FormControl(value.interval),
      dayOcc: new FormControl(""),
      day: new FormControl(""),
      choix: new FormControl(""),
      current: new FormControl(""),
      codeBarre: new FormControl("")
    });
  }
  ngOnInit() {
    console.log(this.listeMaintenanceDefault, this.projet);
    if (this.role == "SuperAdmin") {
      let tmp = [];
      this.listeMetier = this.metiers;
      console.log(this.listeMetier);
      this.listeMaintenanceDefault = this.trieMaintenance(
        this.listeMaintenanceDefault
      );
    
         tmp=this.trieMaintenanceForAllHospital(this.projet)
    

      this.listeMaintenanceDefault=_.concat(this.listeMaintenanceDefault,tmp)
      console.log(this.listeMaintenanceDefault)
      this.createFormSuperAdmin();
    } else {
      this.listeMetier = this.projet[0].metier;
      this.createForm();
      this.listeMaintenance = this.projet[0].maintenance;
    }
    this.mode = "CheckBox";
    this.filterPlaceholder = "Select Day(s)";
    this.selectionOptions = { type: "Multiple" };
  }

  /**
   * compare _id categorie and SubCat for return name
   */
  trieMaintenance(listeMaintenanceDefault: any) {
    let listeMetier: any = this.listeMetier;
    //Boucle for all metier
    for (let index = 0; index < listeMetier.length; index++) {
      const metier = listeMetier[index];
      //Boucle for all maintenance
      for (let index1 = 0; index1 < listeMaintenanceDefault.length; index1++) {
        const maintenance = listeMaintenanceDefault[index1];
        //if categorieMaintenance find
        if (maintenance.categorie == metier._id) {
          listeMaintenanceDefault[index1].nameCat = metier.name;
          //boucle for find subCat
          for (let index2 = 0; index2 < metier.categorie.length; index2++) {
            const subCat = metier.categorie[index2];
            //if find assigne value to subCat
            if (subCat._id == maintenance.subCat) {
              listeMaintenanceDefault[index1].nameSubCat = subCat.name;
            }
          }
        }
      }
    }
    return listeMaintenanceDefault;
  }

  /**
   *Parcours all hospital for assign name of categorie and subCat
   *
   * @param {*} projet
   * @memberof MaintenanceComponent
   */
  trieMaintenanceForAllHospital(projet: any) {
    let tmp = [];
    for (let index = 0; index < projet.length; index++) {
      const maintenance = projet[index].maintenance;
      let tmp2 = [];
      tmp2 = this.trieMaintenance(maintenance);
      if (tmp2.length > 0) {
        if (tmp.length == 0) {
          tmp=tmp2;
        } else {
          tmp.concat(tmp2);
        }
      }
    }

    return tmp;
  }
}

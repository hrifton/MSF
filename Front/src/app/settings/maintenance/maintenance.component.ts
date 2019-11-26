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
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import {
  SelectionSettingsModel,
  DataStateChangeEventArgs,
  GridComponent,
  EditSettingsModel,
  ToolbarItems
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
  public data: Observable<DataStateChangeEventArgs>;
  public pageOptions: Object;
  public state: DataStateChangeEventArgs;
  listeMaintenance: Maintenance;
  subCat: any;
  public role: string = this.us.getStatus();
  public toolbar: ToolbarItems[];
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
  @ViewChild("ejDialog") ejDialog: DialogComponent;
  @ViewChild("checkbox")
  public mulObj: MultiSelectComponent;
  @ViewChild("selectall")
  public checkboxObj: CheckBoxComponent;
  @ViewChild("dropdown")
  public dropdownObj: CheckBoxComponent;
  @ViewChild("select")
  public reorderObj: CheckBoxComponent;
  @ViewChild("grid")
  public grid: GridComponent;
  public mode: string;
  public editSettings: EditSettingsModel;
  public filterPlaceholder: string;
  public lrepeat: { [key: string]: Object }[] = [
    { repeat: "Daily" },
    { repeat: "Weekly" },
    { repeat: "Monthly" },
    { repeat: "Yearly" }
  ];

  public lEnd: { [key: string]: Object }[] = [
    { end: "Period ", value: "Until" },
    { end: "Occurrence ", value: "Count" }
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
  minDate = new Date();
  public targetElement: HTMLElement;
  //#endregion
  ngOnInit() {
    this.toolbar = ["Delete"];
    this.editSettings = {
      allowEditing: false,
      allowAdding: false,
      allowDeleting: true,
      mode: "Normal"
    };
    this.trieTableauMaintenance();
    this.mode = "CheckBox";
    this.filterPlaceholder = "Select Day(s)";
    this.selectionOptions = { type: "Multiple" };
  }
  createForm(data?) {
    if (data) {
      console.log("forma ", data);
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
        startUntil: new FormControl(data.startUntil ? data.StartTime : ""),
        count: new FormControl(data.count ? data.count : ""),
        endUntil: new FormControl(data.endUntil ? data.endUntil : ""),
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
        choix: new FormControl(""),
        interval: new FormControl(""),
        recurrence: new FormControl(""),
        date: new FormControl(""),
        StartTime: new FormControl(""),
        count: new FormControl(""),
        startUntil: new FormControl(""),
        endUntil: new FormControl(""),
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
    console.log($event);
    this.createForm($event.data);
  }
  saveNewMaintenance(maintenance) {
    this.saveMaintenance.emit(maintenance.value);
  }
  public onChange(args: any): void {
    if (args.itemData.categorie) {
      this.subCat = args.itemData.categorie;
    }
    if (null) {
      this.mulObj.showSelectAll = this.checkboxObj.checked;
    }
    if (args.itemData.maintenance != undefined) {
      this.createForm(args.itemData);
    }
  }
  /**
   * @param value
   * Value est la maintenance qui auto-completera le formulaire avec ces valeurs par defaut
   */
  onSelection(value) {
    console.log("OnSelect");
    this.periode = value.periodicity;
    this.maintenanceForm = this.fb.group({
      idMaintnance: new FormControl(value._id, [Validators.required]),
      maintenance: new FormControl(value.maintenance, [Validators.required]),
      executor: new FormControl(value.executor, [Validators.required]),
      periodicity: new FormControl("", [Validators.required]),
      recurrence: new FormControl("", [Validators.required]),
      description: new FormControl(value.description, [Validators.required]),
      startUntil: new FormControl(value.startUntil ? value.StartTime : ""),
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

  trieTableauMaintenance() {
    let tmp = [];
    this.data = null;
    if (this.role == "SuperAdmin") {
      this.listeMetier = this.metiers.slice();
      tmp = this.trieMaintenanceForAllHospital(this.projet);
      this.data = _.concat(
        this.trieMaintenance(this.listeMaintenanceDefault),
        tmp
      );
      this.createFormSuperAdmin();
    } else {
      this.listeMetier = _.concat(
        this.projet[0].metier.slice(),
        this.metiers.slice()
      );
      this.listeMaintenanceDefault = this.trieMaintenance(
        this.listeMaintenanceDefault
      );
      tmp = this.trieMaintenanceForAllHospital(this.projet);
      this.data = _.concat(this.listeMaintenanceDefault, tmp);
      this.createForm();
    }
  }

  /**
   * compare _id categorie and SubCat for return name
   */
  trieMaintenance(listeMaintenanceDefault: any) {
    let listeMetier: any = this.listeMetier;
    let tmp = [];
    //Boucle for all metier
    for (let index = 0; index < listeMetier.length; index++) {
      const metier = listeMetier[index];
      //Boucle for all maintenance

      for (let index1 = 0; index1 < listeMaintenanceDefault.length; index1++) {
        const maintenance = listeMaintenanceDefault[index1];
        listeMaintenanceDefault.projet != undefined
          ? (listeMaintenanceDefault[index1].projet =
              listeMaintenanceDefault.projet)
          : (listeMaintenanceDefault[index1].projet = "Standard");
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
      maintenance.projet = projet[index].project;
      let tmp2 = [];
      tmp2 = this.trieMaintenance(maintenance);
      if (tmp2 != null) {
        if (tmp.length == 0) {
          tmp = tmp2;
        } else {
          tmp = _.concat(tmp, tmp2);
        }
      }
    }
    return tmp;
  }

  refreshGrid(data?) {
    if (data) {
      this.listeMaintenanceDefault = data;
    }

    this.trieTableauMaintenance();
    this.grid.refresh();
  }
  /**
   * delete maintenance + delete date if
   * @param  {} data
   */
  delete(data) {
    console.log(data);
  }

  public onOpenDialog = function(event: any): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };
  actionBegin($event) {
    this.onOpenDialog($event);
    console.log("actionBegin", $event);
  }
  actionComplete($event) {
    console.log("actionComplete", $event);
  }

  public animationSettings: Object = {
    effect: "Zoom",
    duration: 400,
    delay: 0
  };
}

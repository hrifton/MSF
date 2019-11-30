import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  SimpleChanges
} from "@angular/core";
import {
  extend,
  DialogEditEventArgs,
  SaveEventArgs
} from "@syncfusion/ej2-grids/src";
import * as _ from "lodash";
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
  TimelineViewsService,
  TimelineMonthService,
  EventSettingsModel,
  PopupOpenEventArgs,
  View,
  EventRenderedArgs,
  ScheduleComponent,
  TimeScaleModel,
  ActionEventArgs
} from "@syncfusion/ej2-angular-schedule";
import * as moment from "moment";
import { Browser } from "protractor";
import { Dialog } from "@syncfusion/ej2-popups";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import Solution from "src/app/Class/Solution";
@Component({
  selector: "app-calendrier-tech",
  templateUrl: "./calendrier-tech.component.html",
  styleUrls: ["./calendrier-tech.component.css"],
  providers: [DayService, WeekService, WorkWeekService, MonthService]
})
export class CalendrierTechComponent implements OnInit {
  @Input() maintenance;
  @Input() interventions;

  @Output() SolutionSave = new EventEmitter<Solution>();

  public scheduleData: Object[] = [];
  public showQuickInfo: Boolean = false;
  public CurrentTimeIndicator: boolean;
  public data: Object[] = extend([], this.scheduleData, null) as Object[];
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = "Month";
  public allowResizing: boolean = false;
  public timeScale: string = "Hide";
  public solution: string;
  public solutionForm: FormGroup;
  public monthEventTemplate: string =
    '<div class="subject center"> ${Subject}</div>';

  @ViewChild("agenda") public agenda: ScheduleComponent;
  public lStatus: { [key: string]: Object }[] = [
    { status: "Waiting" },
    { status: "Done" },
    { status: "Open" }
  ];
  public status: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formatDataAgenda();
    this.data = this.formatDataAgenda();
    this.CurrentTimeIndicator = false;
    this.eventSettings = {
      dataSource: this.data
    };
    console.log(this.data);
  }

  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === "Agenda") {
      (args.element
        .firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
  /**
   * @function formatDataAgenda()
   * formate data for conformity agenda
   * agenda need champs StartTime, EndTime and Subject
   *
   * @returns tmp array interventions
   * @memberof CalendrierTechComponent
   */
  formatDataAgenda() {
    let tmp = [];
    this.interventions.forEach(element => {
      if (element) {
        console.log(element);
        element.EndTime = element.StartTime;
        element.Subject = element.description;
        if (element.priority == "High") {
          element.CategoryColor = "#df6666d5";
        } else if (element.priority == "Low") {
          element.CategoryColor = "#f8e620d5";
        } else if (element.priority == "Medium") {
          element.CategoryColor = "#f2b95dd5";
        } else if (element.status == "Done") {
          console.log(element, "Status Done ");
          element.CategoryColor = "#c5c5c5d5";
        } else if (element.type == "Maintenance") {
          element.CategoryColor = "##0861c5d5";
        }
        element.id = element._id;
        tmp.push(element);
      }
    });
    return tmp;
  }

  /**
   *@function formateDate()
   *formate date to format day-month-Year
   * @param {*} date
   * @returns
   * @memberof CalendrierTechComponent
   */
  formatdate(date) {
    console.log(date);
    return moment(date).format("MMMM Do YYYY");
  }
  /**
   *@function refreshAgenda()
   * @call Function FormatDataAgenda()
   * Refresh Agenda
   * @memberof CalendrierTechComponent
   */
  refreshAgenda() {
    this.agenda.refresh()
  }
  /**
   *
   *
   * @param {ActionEventArgs} args
   * @memberof CalendrierTechComponent
   */
  public onActionBegin(args: ActionEventArgs): void {
    if (
      args.requestType === "eventCreate" ||
      args.requestType === "eventChange"
    ) {
      this.SolutionSave.emit(this.solutionForm.value);
    }
  }
  /**
   *@function onPopupOpen
   * Open Windows formu
   *
   * @param {PopupOpenEventArgs} args
   * @returns {void}
   * @memberof CalendrierTechComponent
   */
  onPopupOpen(args: PopupOpenEventArgs): void {

    let any: any = args.data;
    console.log(args)
    if (args.type == "Editor") {
      console.log(any.Subject);
      if (any.Subject != undefined) {
        if (any.type == "Maintenance") {
          this.createFormMaintenance(args.data)
        } else {
          this.createForm(args.data);
        }

      } else {
        args.cancel = true;
      }
    } else if (args.type == "QuickInfo") {
      args.cancel = true;
    }
  }
  /**
   *
   *@function createForm
   *generate Formulaire for Intervention
   * @param {*} data
   * @memberof CalendrierTechComponent
   *
   */
  createForm(data) {
    console.log(data)
    this.solutionForm = this.fb.group({
      _id: new FormControl(data._id, [Validators.required]),
      solution: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]),
      asset: new FormControl(data.asset ? data.asset : ""),
      priority: new FormControl(data.priority ? data.priority : ""),
      mat: new FormControl(data.mat ? data.mat : ""),
      dateAssign: new FormControl(data.dateAssing, [Validators.required]),
      metier: new FormControl(data.metier[0]._id),
      subCat: new FormControl(data.subCat),
      idTech: new FormControl(data.idTech, [Validators.required]),
      status: new FormControl(data.status, [Validators.required]),
      idCategorie: new FormControl(data.metier[0]._id, [Validators.required]),
      idDepartement: new FormControl(data.departements[0]._id, [
        Validators.required
      ]),
      idHopital: new FormControl(data.idHopital, [Validators.required]),
      dateCloture: new FormControl("")
    });
    console.log(this.solutionForm.value);
  }


  createFormMaintenance(data): FormGroup {
    // this.findSubCat(data.categorie)
    console.log('Formulaire Maintenance : ', data)
    return new FormGroup({
      _id: new FormControl(data._id),
      idMaintenance: new FormControl(data._id),
      //departement a rajouté
      departement: new FormControl(""),
      categorie: new FormControl(data.categorie ? data.categorie : ""),
      subCat: new FormControl(data.subCat ? data.subCat : ""),
      idTech: new FormControl(data.idTech ? data.idTech : ""),
      locality: new FormControl(data.locality ? data.locality : ""),
      priority: new FormControl("Medium"),
      description: new FormControl(data.description),
      status: new FormControl(data.status),
      StartTime: new FormControl(data.StartTime),
      solution: new FormControl(""),
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    this.interventions = changes.interventions.currentValue;
    this.eventSettings.dataSource = this.formatDataAgenda();
    console.log(this.interventions);
    this.agenda.refresh();
    // You can also use yourInput.previousValue and
  }
}

import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import {
  extend,
  DialogEditEventArgs,
  SaveEventArgs
} from "@syncfusion/ej2-grids/src";

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
  public timeScale: TimeScaleModel = { interval: 60, slotCount: 4 };
  public solution: string;
  public solutionForm: FormGroup;
  @ViewChild("agenda") public agenda: ScheduleComponent;
  public lStatus: { [key: string]: Object }[] = [
    { status: "Waiting" },
    { status: "Done" },
    { status: "Open" }
  ];
  public status: boolean = false;

  constructor(private fb: FormBuilder) {}

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
      if (element.status != "Done") {
        console.log(element.status);
        element.StartTime = this.formatdate(element.dateAssing);
        element.EndTime = element.StartTime;
        element.Subject = element.description;
        if (element.priority == "High") {
          element.CategoryColor = "#df6666d5";
        } else if (element.priority == "Low") {
          element.CategoryColor = "#f8e620d5";
        } else {
          element.CategoryColor = "#f2b95dd5";
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
    return moment(date, "DD-MM-YYYY").format("MMMM Do YYYY");
  }
  /**
   *@function refreshAgenda()
   * @call Function FormatDataAgenda()
   * Refresh Agenda
   * @memberof CalendrierTechComponent
   */
  refreshAgenda() {
    //TODO This.agenda.refresh() not work
    this.ngOnInit();
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
      console.log(args.requestType);
      //TODO rajouté status de l'intervention ensuite+date de cloture s'il y a cloture save()
      console.log(this.solutionForm.value);
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
    let any:any=args.data;
    if (args.type == "Editor") {
      console.log(any.Subject);
      if(any.Subject!=undefined){
        this.createForm(args.data);
      }else{
         args.cancel = true;
      }
      
    } else {
      args.cancel = true;
    }
  }
  /**
   *
   *@function createForm
   *generate Formulaire with data
   * @param {*} data
   * @memberof CalendrierTechComponent
   *
   */
  createForm(data) {
    console.log(data);
    this.solutionForm = this.fb.group({
      idIntervention: new FormControl(data._id, [Validators.required]),
      solution: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]),
      asset: new FormControl(""),
      mat: new FormControl(""),
      dateAssign: new FormControl(data.dateAssing, [Validators.required]),
      tech: new FormControl(data.tech, [Validators.required]),
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
}

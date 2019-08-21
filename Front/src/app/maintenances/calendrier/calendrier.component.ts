//#region iMPORT
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  ElementRef,
  HostListener
} from "@angular/core";
import { DatePicker } from "@syncfusion/ej2-calendars";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import {
  ToastComponent,
  ToastCloseArgs
} from "@syncfusion/ej2-angular-notifications";
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
  ScheduleComponent
} from "@syncfusion/ej2-angular-schedule";
import { extend, dataSourceChanged } from "@syncfusion/ej2-grids/src";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup
} from "@angular/forms";
import { MaintenanceService } from "src/app/Service/maintenance.service";
import { now } from "moment";
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import { EmitType } from "@syncfusion/ej2-base";
import { DateMaintenanceService } from "src/app/Service/dateMaintenance.service";
//#endregion

@Component({
  selector: "app-calendrier",
  templateUrl: "./calendrier.component.html",
  styleUrls: ["./calendrier.component.scss"],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService
  ]
})
export class CalendrierComponent implements OnInit {
  //#region variable
  @Input() maintenance;
  @Input() datemaitenance;
  @Output() messageEvent = new EventEmitter<any>();
  @ViewChild("agenda") public agenda: ScheduleComponent;

  public del: any;
  public scheduleData: Object[] = [];
  public messageDelete: any;
  public show: Boolean = false;
  public toast: any;
  public data: Object[] = extend([], this.scheduleData, null) as Object[];
  public selectedDate: Date = new Date();
  public minDate: Date = new Date();
  public eventSettings: EventSettingsModel = {};
  public currentView: View = "Week";
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
  public maintenanceForm: FormGroup;
  //#endregion

  constructor(
    private fb: FormBuilder,
    private ms: MaintenanceService,
    private ds: DateMaintenanceService
  ) {
    console.log("maintenance calendier constructor");
  }

  /**Creation formulaire avec champs date precomplété
   *
   * @param data
   */
  createForm(data) {
    this.maintenanceForm = this.fb.group({
      status: new FormControl("", [Validators.required]),
      repeat: new FormControl("", [Validators.required]),
      StartTime: new FormControl(data.StartTime, [Validators.required]),
      EndTime: new FormControl(data.EndTime, [Validators.required])
    });
  }
  /**fermture popup
   *
   */
  cancel() {
    this.show = false;
  }
  /**async delSerie()
   *  fonction async pour attendre le retour de la requete
   * fermeture du popup
   * affichage d'un toast
   *
   */
  async delSerie() {
    this.messageDelete = await this.ds.deleteSerieDateMaintenance(this.del);
    this.cancel();
    this.toastObj.show();
    this.removeMaintenance(this.del);
    this.deleteElements();
    this.refreshAgenda();
  }
  /**deleteElement()
   * suppression de plusieur element
   * array tmp
   * foreach sur liste des date de maintenance
   * si element.idMaintenance different de l'idMaintenant a delete && element.codeBarre different du codeBarre a delete
   * on push element dans l'array tmp
   * une fois foreach fini ecrase liste DateMaintenance avec tmp qui contien les dateMaintenance restant
   */
  deleteElements() {
    var tmp: any = [];
    this.datemaitenance.forEach(element => {
      if (
        element.idMaintenance !== this.del.event.idMaintenance &&
        element.codeBarre !== this.del.event.codeBarre
      ) {
        tmp.push(element);
      }
    });

    this.datemaitenance = tmp;
    this.removeMaintenance(this.datemaitenance);
    this.refreshAgenda();
  }
  /**delOccu()
   *  1 supprime element dans la DB
   *  2 supprime element dans le tableau
   *  3 fermeture voite de dialog
   */
  async delOccu() {
    this.messageDelete = await this.ds.deleteDateMaintenance(this.del);
    this.deleteElement();
    this.cancel();
    this.toastObj.show();
    this.refreshAgenda();
  }
  deleteElement() {
    var tmp: any = [];
    this.datemaitenance.forEach(element => {
      if (element._id !== this.del.event._id) {
        tmp.push(element);
      }
    });
    this.datemaitenance = tmp;
    this.removeMaintenance(this.datemaitenance);
    this.refreshAgenda();
  }

  onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
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
  onPopupOpen(args: PopupOpenEventArgs): void {
    console.log(args);
    if (args.type === "EventContainer") {
      args.cancel = true;
    }
    if (args.type === "Editor") {
      this.createForm(args.data);
    }
    if (args.type === "DeleteAlert") {
      this.show = true;
      this.del = args.data;
      args.cancel = true;
    }
  }

  onActionBegin(args: EventRenderedArgs): void {
    const type = Object.entries(args);

    if (type[0][1] === "eventChange") {
      console.log("update");
    }
    if (type[0][1] === "eventRemove") {
      console.log("removemovemovemove");

      this.removeMaintenance(type[2][[1][0]]);
    }
  }
  removeMaintenance(data: any) {
    this.messageEvent.emit(data);
  }

  ngOnInit() {
    this.toastObj.hide("All");
    this.createlisteMaintenance(this.datemaitenance, this.maintenance);
    console.log("maintenance calendier Init");
    console.log("Maintenance was initialized with : ", this.maintenance);

    this.data.push(...this.datemaitenance);
    this.eventSettings = {
      dataSource: this.data
    };
  }
  createlisteMaintenance(datemaintenance: any, maintenance: any) {
    datemaintenance.forEach(datemain => {
      maintenance.forEach(maint => {
        if (maint._id === datemain.idMaintenance) {
          datemain.Subject = maint.maintenance;
          // TODO Hicham  Switch Color maintenance
          switch (maint.executor) {
            case "Biomed":
              datemain.CategoryColor = "#1ea519";
              break;
            case "Electrician":
              datemain.CategoryColor = "#4974A2";
              break;

            default:
              break;
          }
          this.data.push(...datemain);
        }
      });
    });
  }

  refreshAgenda() {
    this.eventSettings = {
      dataSource: this.datemaitenance
    };
    this.agenda.refresh();
  }
  /**
   * Toast
   */

  @ViewChild("defaulttoast")
  public toastObj: ToastComponent;
  @ViewChild("toastBtnShow")
  public btnEleShow: ElementRef;
  public position: Object = { X: "Center" };
}

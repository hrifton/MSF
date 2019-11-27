//#region iMPORT
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { ToastComponent } from "@syncfusion/ej2-angular-notifications";
import {
  DayService,
  WeekService,
  MonthService,
  EventSettingsModel,
  PopupOpenEventArgs,
  View,
  EventRenderedArgs,
  ScheduleComponent
} from "@syncfusion/ej2-angular-schedule";
import { extend } from "@syncfusion/ej2-grids/src";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup
} from "@angular/forms";
import { DateMaintenanceService } from "src/app/Service/dateMaintenance.service";
//#endregion

@Component({
  selector: "app-calendrier",
  templateUrl: "./calendrier.component.html",
  styleUrls: ["./calendrier.component.scss"],
  providers: [DayService, WeekService, MonthService]
})
export class CalendrierComponent implements OnInit {
  constructor(private fb: FormBuilder, private ds: DateMaintenanceService) {
    console.log("maintenance calendier constructor");
  }
  //#region variable
  // variable entré depuis component maintenance
  @Input() maintenance;
  @Input() datemaitenance;
  //Sortie vers component maintenance
  @Output() messageEvent = new EventEmitter<any>();
  //variable agenda syncfusion
  @ViewChild("agenda") public agenda: ScheduleComponent;

  public del: any;
  public scheduleData: Object[] = [];
  public messageDelete: any;
  public show: Boolean = false;
  public toast: any;
  public data: Object[] = extend([], this.scheduleData, null) as Object[];
  public selectedDate: Date = new Date();
  public minDate: Date = new Date();
  public timeScale: string = "Hide";
  public eventSettings: EventSettingsModel = {};
  public currentView: View = "Month";
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
  /**
   * Toast
   */

  @ViewChild("defaulttoast")
  public toastObj: ToastComponent;
  @ViewChild("toastBtnShow")
  public btnEleShow: ElementRef;
  public position: Object = { X: "Center" };
  ngOnInit() {
    this.toastObj.hide("All");
    this.createlisteMaintenance(this.datemaitenance, this.maintenance);
    this.agenda.timeScale.enable = false;
    //this.agenda.dataBind();
    console.log("maintenance calendier Init");
    console.log("Maintenance was initialized with : ", this.maintenance);
this.formatDataAgenda()
    this.data.push(...this.datemaitenance);
    this.eventSettings = {
      dataSource: this.data
    };
    console.log(this.eventSettings);

    
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
  /**
   *fermture popup
   */
  cancel() {
    this.show = false;
  }
  /**async delSerie()
   * fonction async pour attendre le retour de la requete
   * fermeture du popup
   * affichage d'un toast
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
    let tmp: any = [];
    this.datemaitenance.forEach(element => {
      console.log(typeof element);
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
   *  3 fermeture boite de dialog
   *  4 affichage toast confirmation suppression
   */
  async delOccu() {
    this.messageDelete = await this.ds.deleteDateMaintenance(this.del);
    this.deleteElement();
    this.cancel();
    this.toastObj.show();
  }
  /**
   * 1 recuperation des maintenances differente de la maintenance a supprimer
   * 2 tableau temporaire est assigner dans le tableau des date de maintenance
   * 3 envoi du tableau fonction removeMaintenance
   */
  deleteElement() {
    let tmp: any = [];
    this.datemaitenance.forEach(element => {
      if (element._id !== this.del.event._id) {
        tmp.push(element);
      }
    });
    this.datemaitenance = tmp;
    this.removeMaintenance(this.datemaitenance);
  }
  /**
   *
   * @param data -> tableau date d'intervention
   * sortie du component calendrier via messageEvent
   */
  removeMaintenance(data: any) {
    this.messageEvent.emit(data);
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

  createlisteMaintenance(datemaintenance: any, maintenance: any) {
    datemaintenance.forEach(datemain => {
      maintenance.forEach(maint => {
        if (maint._id === datemain.idMaintenance) {
          datemain.Subject = maint.maintenance;
          // TODO Hicham a modifier dans le backend mettre la couleur dans le document domaine NoSQL
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
  formatDataAgenda() {
    let tmp = [];
    this.datemaitenance.forEach(element => {
      console.log(element)
      if (element.status != "Done") {
        console.log(element.status);
        console.log(element);
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
  refreshAgenda() {
    this.eventSettings = {
      dataSource: this.datemaitenance
    };
    this.agenda.refresh();
  }
}

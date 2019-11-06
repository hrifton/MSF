import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { extend } from "@syncfusion/ej2-grids/src";
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
  TimeScaleModel
} from "@syncfusion/ej2-angular-schedule";
import * as moment from "moment";
@Component({
  selector: "app-calendrier-tech",
  templateUrl: "./calendrier-tech.component.html",
  styleUrls: ["./calendrier-tech.component.css"],
  providers: [DayService, WeekService, WorkWeekService, MonthService]
})
export class CalendrierTechComponent implements OnInit {
  @Input() maintenance;
  @Input() interventions;
  public scheduleData: Object[] = [];
  public data: Object[] = extend([], this.scheduleData, null) as Object[];
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = "Month";
  public allowResizing: boolean = false;
  public timeScale: TimeScaleModel = { interval: 60, slotCount: 4 };

  @ViewChild("agenda") public agenda: ScheduleComponent;
  constructor() {}

  ngOnInit() {
    console.log(this.interventions);
    this.formatDataAgenda();
    this.data = this.formatDataAgenda();
    this.eventSettings = {
      dataSource: this.data
    };
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

  formatDataAgenda() {
    let tmp = [];
    this.interventions.forEach(element => {
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
    });
    return tmp;
  }
  formatdate(date) {
    return moment(date, "DD-MM-YYYY").format("MMMM Do YYYY");
  }

  refreshAgenda() {
    this.agenda.refresh();
  }
}

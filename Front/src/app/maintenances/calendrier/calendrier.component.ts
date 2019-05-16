import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
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
} from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-grids/src';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MaintenanceService } from 'src/app/Service/maintenance.service';
import { now } from 'moment';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  //styleUrls: ['./calendrier.component.scss'],
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
  @Input() maintenance;
  @Input() datemaitenance;
  @Output() messageEvent = new EventEmitter<any>();
  @ViewChild('agenda') public agenda: ScheduleComponent;


  public maintenanceForm: FormGroup;

  constructor(private fb: FormBuilder, private ms: MaintenanceService) {
    console.log('maintenance calendier constructor');
  }
  scheduleData: Object[] = [
    // {
    //     Id: 1,
    //     Subject: 'Explosion of Betelgeuse Star',
    //     Location: 'Space Centre USA',
    //     StartTime: new Date(),
    //     EndTime: new Date(),
    //     CategoryColor: '#1aaa55'
    // },

  ];

  public data: Object[] = extend([], this.scheduleData, null) as Object[];
  public selectedDate: Date = new Date();
  public minDate: Date = new Date();
  public eventSettings: EventSettingsModel = {};
  public currentView: View = 'Week';
  public lrepeat: { [key: string]: Object }[] = [
    { repeat: 'Never' },
    { repeat: 'Daily' },
    { repeat: 'Weekly' },
    { repeat: 'Monthly' },
    { repeat: 'Yearly' },

  ];

  public lEnd: { [key: string]: Object }[] = [
    { end: 'Never' },
    { end: 'Until' },
    { end: 'Count' },


  ];
  //Creation du formulaire
  createForm(data) {
    this.maintenanceForm = this.fb.group({
      status: new FormControl('', [Validators.required]),
      repeat: new FormControl('', [Validators.required]),
      StartTime: new FormControl(data.StartTime, [Validators.required]),
      EndTime: new FormControl(data.EndTime, [Validators.required])
    });
  }
  public onChange(args: any): void {
    console.log('changement');

  }

  onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
  onPopupOpen(args: PopupOpenEventArgs): void {
    console.log(args);
    if (args.type === 'Editor') {
      this.createForm(args.data);
    }
    if (args.type === 'DeleteAlert') {
      const data = args.data;
      console.log(data);
    }
  }
  onActionBegin(args: EventRenderedArgs): void {
    const type = Object.entries(args);

    if (type[0][1] === 'eventChange') {
      console.log('update');
    }
    if (type[0][1] === 'eventRemove') {

      this.removeMaintenance(type[2][[1][0]]);

    }
  }
  removeMaintenance(data: any) {

    this.messageEvent.emit(data[0]._id);
  }

  ngOnInit() {
    this.createlisteMaintenance(this.datemaitenance, this.maintenance);
    console.log('maintenance calendier Init');
    console.log('Maintenance was initialized with : ', this.maintenance);

    this.data.push(...this.datemaitenance);
    this.eventSettings = {
      dataSource: this.data
    };
    console.log(this.data.length);
  }
  createlisteMaintenance(datemaintenance: any, maintenance: any) {
    console.log('test');
    datemaintenance.forEach(datemain => {
      maintenance.forEach(maint => {
        if (maint._id === datemain.idMaintenance) {
          datemain.Subject = maint.task;
          // TODO Hicham  Switch Color maintenance
          switch (maint.executor) {
            case 'Biomed':
              datemain.CategoryColor = '#1ea519';
              break;
            case 'Electrician':
              datemain.CategoryColor = '#4974A2';
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


}

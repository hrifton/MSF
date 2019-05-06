import { Component, OnInit, Input } from '@angular/core';
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
  EventRenderedArgs
} from "@syncfusion/ej2-angular-schedule";
import { extend } from "@syncfusion/ej2-grids/src";
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MaintenanceService } from 'src/app/Service/maintenance.service';
import { now } from 'moment';

@Component({
  selector: "app-calendrier",
  templateUrl: "./calendrier.component.html",
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


  public maintenanceForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: MaintenanceService) {
    console.log("maintenance calendier constructor");
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
    {
      Id: 2,
      Subject: "Thule Air Crash Report",
      Location: "Newyork City",
      StartTime: new Date(2019, 3, 25, 12, 0),
      EndTime: new Date(2019, 3, 25, 13, 0),
      CategoryColor: "#357cd2"
    },
    {
      Id: 3,
      Subject: "Blue Moon Eclipse",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 3, 21, 9, 30),
      EndTime: new Date(2019, 3, 21, 11, 0),
      CategoryColor: "#7fa900"
    },
    {
      Id: 4,
      Subject: "Meteor Showers in 2018",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 9, 13, 0),
      EndTime: new Date(2019, 0, 9, 14, 30),
      CategoryColor: "#ea7a57"
    },
    {
      Id: 5,
      Subject: "Milky Way as Melting pot",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 10, 12, 0),
      EndTime: new Date(2019, 0, 10, 14, 0),
      CategoryColor: "#00bdae"
    },
    {
      Id: 6,
      Subject: "Mysteries of Bermuda Triangle",
      Location: "Bermuda",
      StartTime: new Date(2019, 0, 10, 9, 30),
      EndTime: new Date(2019, 0, 10, 11, 0),
      CategoryColor: "#f57f17"
    },
    {
      Id: 7,
      Subject: "Glaciers and Snowflakes",
      Location: "Himalayas",
      StartTime: new Date(2019, 0, 11, 11, 0),
      EndTime: new Date(2019, 0, 11, 12, 30),
      CategoryColor: "#1aaa55"
    },
    {
      Id: 8,
      Subject: "Life on Mars",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 12, 9, 0),
      EndTime: new Date(2019, 0, 12, 10, 0),
      CategoryColor: "#357cd2"
    },
    {
      Id: 9,
      Subject: "Alien Civilization",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 14, 11, 0),
      EndTime: new Date(2019, 0, 14, 13, 0),
      CategoryColor: "#7fa900"
    },
    {
      Id: 10,
      Subject: "Wildlife Galleries",
      Location: "Africa",
      StartTime: new Date(2019, 0, 16, 11, 0),
      EndTime: new Date(2019, 0, 16, 13, 0),
      CategoryColor: "#ea7a57"
    },
    {
      Id: 11,
      Subject: "Best Photography 2018",
      Location: "London",
      StartTime: new Date(2019, 0, 17, 9, 30),
      EndTime: new Date(2019, 0, 17, 11, 0),
      CategoryColor: "#00bdae"
    },
    {
      Id: 12,
      Subject: "Smarter Puppies",
      Location: "Sweden",
      StartTime: new Date(2019, 0, 4, 10, 0),
      EndTime: new Date(2019, 0, 4, 11, 30),
      CategoryColor: "#f57f17"
    },
    {
      Id: 13,
      Subject: "Myths of Andromeda Galaxy",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 2, 10, 30),
      EndTime: new Date(2019, 0, 2, 12, 30),
      CategoryColor: "#1aaa55"
    },
    {
      Id: 14,
      Subject: "Aliens vs Humans",
      Location: "Research Centre of USA",
      StartTime: new Date(2019, 1, 1, 10, 0),
      EndTime: new Date(2019, 1, 1, 11, 30),
      CategoryColor: "#357cd2"
    },
    {
      Id: 15,
      Subject: "Facts of Humming Birds",
      Location: "California",
      StartTime: new Date(2019, 0, 15, 9, 30),
      EndTime: new Date(2019, 0, 15, 11, 0),
      CategoryColor: "#7fa900"
    },
    {
      Id: 16,
      Subject: "Sky Gazers",
      Location: "Alaska",
      StartTime: new Date(2019, 0, 18, 11, 0),
      EndTime: new Date(2019, 0, 18, 13, 0),
      CategoryColor: "#ea7a57"
    },
    {
      Id: 17,
      Subject: "The Cycle of Seasons",
      Location: "Research Centre of USA",
      StartTime: new Date(2019, 0, 7, 5, 30),
      EndTime: new Date(2019, 0, 7, 7, 30),
      CategoryColor: "#00bdae"
    },
    {
      Id: 18,
      Subject: "Space Galaxies and Planets",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 7, 17, 0),
      EndTime: new Date(2019, 0, 7, 18, 30),
      CategoryColor: "#f57f17"
    },
    {
      Id: 19,
      Subject: "Lifecycle of Bumblebee",
      Location: "San Fransisco",
      StartTime: new Date(2019, 0, 10, 6, 0),
      EndTime: new Date(2019, 0, 10, 7, 30),
      CategoryColor: "#7fa900"
    },
    {
      Id: 20,
      Subject: "Alien Civilization",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 10, 16, 0),
      EndTime: new Date(2019, 0, 10, 18, 0),
      CategoryColor: "#ea7a57"
    },
    {
      Id: 21,
      Subject: "Alien Civilization",
      Location: "Space Centre USA",
      StartTime: new Date(2019, 0, 6, 14, 0),
      EndTime: new Date(2019, 0, 6, 16, 0),
      CategoryColor: "#ea7a57"
    },
    {
      Id: 22,
      Subject: "The Cycle of Seasons",
      Location: "Research Centre of USA",
      StartTime: new Date(2019, 0, 8, 14, 30),
      EndTime: new Date(2019, 0, 8, 16, 0),
      CategoryColor: "#00bdae"
    },
    {
      Id: 23,
      Subject: "Sky Gazers",
      Location: "Greenland",
      StartTime: new Date(2019, 0, 11, 14, 30),
      EndTime: new Date(2019, 0, 11, 16, 0),
      CategoryColor: "#ea7a57"
    },
    {
      Id: 24,
      Subject: "Facts of Humming Birds",
      Location: "California",
      StartTime: new Date(2019, 0, 12, 12, 30),
      EndTime: new Date(2019, 0, 12, 14, 30),
      CategoryColor: "#7fa900"
    }
  ];
  
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
    { repeat: "Yearly" },

  ];

  public lEnd: { [key: string]: Object }[] = [
    { end: "Never" },
    { end: "Until" },
    { end: "Count" },
  

  ];
  //Creation du formulaire
  createForm() {
    this.maintenanceForm = this.fb.group({
      status: new FormControl('', [Validators.required]),
      repeat: new FormControl('', [Validators.required]),
      StartTime: new FormControl('', [Validators.required]),
      EndTime: new FormControl('', [Validators.required])
    })
  }
  public onChange(args: any): void {

    
  }

  onEventRendered(args: any): void {
    console.log(args)
  }
  onPopupOpen(args: PopupOpenEventArgs): void {
    console.log("PopupOpenEventArgs")
  }
  onActionBegin(args: EventRenderedArgs): void {
    console.log("onActionBegin")
  }

  ngOnInit() {
    this.createlisteMaintenance(this.datemaitenance, this.maintenance);
    console.log("maintenance calendier Init");
    console.log("Maintenance was initialized with : ", this.maintenance);

    this.maintenance[0].StartTime = new Date();
    this.maintenance[0].EndTime = new Date();
    this.maintenance[0].Subject = this.maintenance[0].description;

    this.data.push(...this.maintenance);
    this.eventSettings = {
      dataSource: this.data
    };
  }
  createlisteMaintenance(datemaintenance: any, maintenance: any) {
    console.log("test")
    console.log(datemaintenance)
    datemaintenance.forEach(datemain => {
      console.log(datemain.idMaintenance)
      maintenance.forEach(maint => {
        console.log(maint);

      });
    });
  }

}

import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl, FormBuilder } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Maintenance } from 'src/app/Class/Maintenance';
import { ChangeEventArgs, FilterType, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { MaintenanceService } from 'src/app/Service/maintenance.service';


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
  RecurrenceEditor,
  EventRenderedArgs
} from '@syncfusion/ej2-angular-schedule';

import * as moment from 'moment';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {


  constructor(private fb: FormBuilder, private ms: MaintenanceService) {
    this.createForm();
  }
  maintenances: Maintenance[];
 
  date = new Date();

  periode: any;

  @Input() lrepeat: any;
  @Input() lEnd: any;
  @Output() messageEvent = new EventEmitter<any>();

  maintenanceForm: FormGroup;


  hasUnitNumber = false;





  @ViewChild('checkbox')
  public mulObj: MultiSelectComponent;
  @ViewChild('selectall')
  public checkboxObj: CheckBoxComponent;
  @ViewChild('dropdown')
  public dropdownObj: CheckBoxComponent;
  @ViewChild('select')
  public reorderObj: CheckBoxComponent;
  public mode: string;
  public filterPlaceholder: string;
  // define the data with category
  public days: { [key: string]: Object }[] = [
    { Name: 'Monday', Code: 'M' },
    { Name: 'Tuesday', Code: 'T' },
    { Name: 'Wednesday', Code: 'W' },
    { Name: 'Thursday', Code: 'Th' },
    { Name: 'Friday', Code: 'F' },
    { Name: 'Saturday', Code: 'Sa' },
    { Name: 'Sunday', Code: 'Su' }
  ];
  public currents: { [key: string]: Object }[] = [
    { Name: 'First', Code: '1' },
    { Name: 'Second', Code: '2' },
    { Name: 'Third', Code: '3' },
    { Name: 'Last', Code: '4' },
  ];
  public lMonth: { [key: string]: Object }[] = [
    { Name: 'January', Code: 0 },
    { Name: 'February', Code: 1 },
    { Name: 'March', Code: 2 },
    { Name: 'April', Code: 3 },
    { Name: 'May', Code: 4 },
    { Name: 'June', Code: 5 },
    { Name: 'July', Code: 6 },
    { Name: 'August', Code: 7 },
    { Name: 'September', Code: 8 },
    { Name: 'October', Code: 9 },
    { Name: 'November', Code: 10 },
    { Name: 'December', Code: 11 },
  ];
  // map the groupBy field with category column
  public checkFields: Object = { text: 'Name', value: 'Code' };
  // set the placeholder to the MultiSelect input
  public checkWaterMark = 'Select Day(s)';
  // set the MultiSelect popup height
  public popHeight = '350px';

  createForm() {
    this.maintenanceForm = this.fb.group({
      maintenance: new FormControl('', [Validators.required]),
      executor: new FormControl('', [Validators.required]),
      periodicity: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      recurrence: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      StartTime: new FormControl('', [Validators.required]),
      count: new FormControl(''),
      until: new FormControl(''),
    });
  }

  public onChange(args: any): void {
    // TODO trouver une solution
    if (args.itemData.task != undefined) {
      this.onSelection(args.itemData);
    }
    console.log(args.itemData.StartTime);
    this.mulObj.showSelectAll = this.checkboxObj.checked;

  }

  ngOnInit() {

    this.ms.getMaintenance().subscribe((data: Maintenance[]) => {
      this.maintenances = data;
    });


    const recurrObject: RecurrenceEditor = new RecurrenceEditor({
    });



    this.mode = 'CheckBox';
    this.filterPlaceholder = 'Select Day(s)';

  }
  onSelection(value) {

    this.periode = value.periodicity;

    this.maintenanceForm = this.fb.group({
      idMaintnance: new FormControl(value._id, [Validators.required]),
      maintenance: new FormControl(value.task, [Validators.required]),
      executor: new FormControl(value.executor, [Validators.required]),
      periodicity: new FormControl(value.periodicity, [Validators.required]),
      duration: new FormControl(value.duration, [Validators.required]),
      recurrence: new FormControl(value.recurrence, [Validators.required]),
      description: new FormControl(value.description, [Validators.required]),
      StartTime: new FormControl('', [Validators.required]),
      // TODO count ou until a false
      count: new FormControl(''),
      until: new FormControl(''),
      listDay: new FormControl([]),
      end: new FormControl(''),
      interval: new FormControl(''),
      dayOcc: new FormControl(''),
      choix: new FormControl(''),
    });

  }

  saveDate(maintenance) {

    switch (maintenance.value.periodicity) {
      case 'Daily': {
        this.saveDaily(maintenance.value);
        break;
      }
      case 'Weekly': {
        this.saveWeekly(maintenance.value);
        break;
      }
      case 'Monthly': {
        this.saveMonthly(maintenance.value);
        break;
      }
      case 'Yearly': {
        this.saveYearly(maintenance.value);
        break;
      }

      default:
        break;
    }



    // this.messageEvent.emit(date);
  }

  // Save by Yearly
  saveYearly(maintenance) {
    console.log('traitement Yearly');
    console.log(maintenance.end);
  }

  // Save By Monthly
  saveMonthly(maintenance) {
    throw new Error('Method not implemented.');
  }

  // Save By Weekly
  saveWeekly(maintenance) {
    throw new Error('Method not implemented.');
  }

  // Save By Daily
  saveDaily(maintenance) {
    if (maintenance.end === 'Until') { this.planDayUntil(maintenance); } else { this.planDayCount(maintenance); }

  }

  // TODO Date depasse tjs de 1
  planDayUntil(maintenance) {
    let newMaintenances: any = [];
    while (moment(maintenance.StartTime).isBefore(maintenance.until)) {
      this.traitementPlanByDay(maintenance,newMaintenances)
    }
    this.messageEvent.emit(newMaintenances);
    this.createForm();
  }



  planDayCount(maintenance) {
    let newMaintenances: any = [];
    for (let index = 1; index <= maintenance.count; index++) {
      this.traitementPlanByDay(maintenance,newMaintenances)
    }
    this.messageEvent.emit(newMaintenances);
    this.createForm();
  }




  traitementPlanByDay(maintenance,newMaintenances){
    maintenance.StartTime = moment(maintenance.StartTime).format('LLLL');
    maintenance.EndTime = this.addTime(moment(maintenance.StartTime, 'LLLL'), maintenance.duration);

    const dayMain: DayMain = {
      StartTime: maintenance.StartTime,
      EndTime: maintenance.EndTime,
      Subject: maintenance.maintenance,
      idMaintenance: maintenance.idMaintnance
    };
    newMaintenances.push(dayMain);

    maintenance.StartTime = moment(maintenance.StartTime, 'LLLL').add(maintenance.interval, 'days');
    
  }




  addTime(EndTime, duration) {
    // split  string nb unité (hours or minutes)
    const tab = duration.split(' ');

    let mesureTemps = tab[1];
    if (mesureTemps[0] === 'h' || mesureTemps[0] === 'H') { mesureTemps = 'hours'; }
    if (mesureTemps[0] === 'm' || mesureTemps[0] === 'M') { mesureTemps = 'm'; }

    EndTime = moment(EndTime, 'DD/MM/YYYY LT').add(tab[0], mesureTemps);
    return moment(EndTime).format('LLLL');

  }


  public onChangeDrop(): void {
    // enable or disable the dropdown button in Multiselect based on CheckBox checked state
    this.mulObj.showDropDownIcon = this.dropdownObj.checked;
  }
  public onChangeReorder(): void {
    // enable or disable the list reorder in Multiselect based on CheckBox checked state
    this.mulObj.enableSelectionOrder = this.reorderObj.checked;
  }
}
export interface DayMain {
  StartTime?: Date;
  EndTime?: Date;
  Subject?: string;
  idMaintenance?: any;
}

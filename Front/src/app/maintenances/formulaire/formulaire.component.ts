
//#region
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { RecurrenceEditor } from '@syncfusion/ej2-angular-schedule';
import * as moment from 'moment';
import { Maintenance } from 'src/app/Class/Maintenance';
import { MaintenanceService } from 'src/app/Service/maintenance.service';
import { MatNativeDateModule } from '@angular/material';
//#endregion



// var momentDay = require('moment-weekdaysin');

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {


  constructor(private fb: FormBuilder, private ms: MaintenanceService) {
    this.createForm();
  }
  //#region Declaration Variable
  maintenances: Maintenance[];

  // date = new Date();

  periode: any;

  @Input() lrepeat: any;
  @Input() lEnd: any;
  @Output() messageEvent = new EventEmitter<any>();

  maintenanceForm: FormGroup;


  // hasUnitNumber = false;


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
    { Name: 'Monday', Code: '1' },
    { Name: 'Tuesday', Code: '2' },
    { Name: 'Wednesday', Code: '3' },
    { Name: 'Thursday', Code: '4' },
    { Name: 'Friday', Code: '5' },
    { Name: 'Saturday', Code: '6' },
    { Name: 'Sunday', Code: '0' }
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
  //#endregion

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
      codeBarre: new FormControl(''),
    });
  }

  public onChange(args: any): void {
    // TODO Hicham trouver une solution
    if (args.itemData.maintenance != undefined) {
      this.onSelection(args.itemData);
    }
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
      maintenance: new FormControl(value.maintenance, [Validators.required]),
      executor: new FormControl(value.executor, [Validators.required]),
      periodicity: new FormControl('', [Validators.required]),
      duration: new FormControl(value.duration, [Validators.required]),
      recurrence: new FormControl('', [Validators.required]),
      description: new FormControl(value.description, [Validators.required]),
      StartTime: new FormControl('', [Validators.required]),
      // TODO Hicham  count ou until a false
      count: new FormControl(''),
      until: new FormControl(''),
      listDay: new FormControl([]),
      end: new FormControl(''),
      interval: new FormControl(value.interval),
      dayOcc: new FormControl(''),
      day: new FormControl(''),
      choix: new FormControl(''),
      current: new FormControl(''),
      codeBarre: new FormControl(''),
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

  //#region save by Year
  saveYearly(maintenance) {

    console.log('traitement Yearly');
    console.log(maintenance.end);
  }
  //#endregion

  //#region save by Month
  saveMonthly(maintenance) {
    if (maintenance.end === 'Until') { this.planMonthlyUntil(maintenance); } else { this.planMonthlyCount(maintenance); }
  }
  /**
   *
   * @param maintenance
   * premet la plannification d'un nombre de fois definit
   *
   * soit selon un le neme jours du mois
   * ou selon une date definit
   */
  planMonthlyCount(maintenance: any) {

    // splite date month year
    const month = moment(maintenance.StartTime).format('MM');
    const year = parseInt(moment(maintenance.StartTime).format('YYYY'));
    const time = moment(maintenance.StartTime).format('LT');
    // create date with month and year
    const date = moment(month + '' + year, 'M/YYYY');

    // array for stock new Maintenance
    const newMaintenances: any = [];

    // loop for nomber occurence ask
    for (let index = 0; index < maintenance.count; index++) {
      // this.traitementCurrentByMonth(maintenance.current, date, maintenance);
      // maintenance.StartTime = (moment(maintenance.StartTime.format('ll') + ' ' + time).format('llll'));
      // this.traitementPlanByDay(maintenance, newMaintenances);
      // date.add(maintenance.interval, 'M');
      this.traitementByMonth(maintenance, newMaintenances, date, time);
    }

    this.messageEvent.emit(newMaintenances);
    this.createForm();


  }
  /**
   *
   * @param maintenance
   *
   * premet la plannification jusqu'une date limite
   *
   * soit selon un le neme jours du mois
   * ou selon une date definit
   */
  planMonthlyUntil(maintenance: any) {
    const newMaintenances: any = [];
    const time = moment(maintenance.StartTime).format('LT');
    const month = moment(maintenance.StartTime).format('M');
    const year = moment(maintenance.StartTime).format('YYYY');
    const date = moment(month + ' ' + year, 'M YYYY').day(maintenance.day);



    while (moment(maintenance.StartTime).isBefore(moment(maintenance.until))) {
     this.traitementByMonth(maintenance, newMaintenances, date, time);
    }
    this.messageEvent.emit(newMaintenances);
    this.createForm();


  }
  //#endregion

  //#region save by Week
  /**
   *
   * @param maintenance
   * determine si la fin de la plannification
   * se fait selon une date limite ou un nombre de repetition
   *  pour une plannification par semaine
   */
  saveWeekly(maintenance) {
    if (maintenance.end === 'Until') { this.planWeekUntil(maintenance); } else { this.planWeekCount(maintenance); }
  }

  /**
   *
   * @param maintenance
   *
   * traitement du planning par semaine avec nombre de repétition determiner
   */
  planWeekCount(maintenance: any) {

    const nbWeek = moment(moment(maintenance.StartTime)).week(); 
    const newMaintenances: any = [];
    const time = moment(maintenance.StartTime).format('LT');
    for (let index = 0; index < maintenance.count; index++) {
      
      maintenance.listDay.forEach(element => {
        const date = (moment().day(element).week(nbWeek + index).format('LL'));
        maintenance.StartTime = (moment(date + ' ' + time).format('llll'));
        this.traitementPlanByDay(maintenance, newMaintenances);
        maintenance.StartTime = moment(maintenance.StartTime).add(maintenance.interval, 'weeks');
      });

    }

    // console.log(newMaintenances)

    this.messageEvent.emit(newMaintenances);
    this.createForm();

  }
  /**
   *
   * @param maintenance
   * traitement du planning par semaine avec date de limite
   */
  planWeekUntil(maintenance: any) {
    let nbWeek;
    const newMaintenances: any = [];
    const time = moment(maintenance.StartTime).format('LT');


    while (moment(maintenance.StartTime).isBefore(maintenance.until)) {
      nbWeek = moment(moment(maintenance.StartTime)).week();

      maintenance.listDay.forEach(element => {
        const date = (moment().day(element).week(nbWeek).format('LL'));
        maintenance.StartTime = (moment(date + ' ' + time).format('llll'));
        this.traitementPlanByDay(maintenance, newMaintenances);

      });

      maintenance.StartTime = moment(maintenance.StartTime).add(maintenance.interval, 'weeks');

    }
    this.messageEvent.emit(newMaintenances);
    this.createForm();
  }
  //#endregion

  //#region save by Day
  /**
   *
   * @param maintenance
   * determine si la fin de la plannification
   * se fait selon une date limite ou un nombre de repetition
   * pour plannification par jour
   */
  saveDaily(maintenance) {
    if (maintenance.end === 'Until') { this.planDayUntil(maintenance); } else { this.planDayCount(maintenance); }

  }

  // TODO Hicham Date depasse tjs de 1
  planDayUntil(maintenance) {
    const newMaintenances: any = [];
    while (moment(maintenance.StartTime).isBefore(maintenance.until)) {
      this.traitementPlanByDay(maintenance, newMaintenances);
    }
    this.messageEvent.emit(newMaintenances);
    this.createForm();
  }

  planDayCount(maintenance) {
    const newMaintenances: any = [];
    for (let index = 1; index <= maintenance.count; index++) {
      this.traitementPlanByDay(maintenance, newMaintenances);
    }
    this.messageEvent.emit(newMaintenances);
    this.createForm();
  }
  //#endregion


  //#region Tools
  /**traitementCurrentByMonth(current, date, maintenance)
 *
 * @param current 
 * definit le numero de la semaine
 * @param date 
 * definit le mois a traité
 * @param maintenance 
 * definit le jour de la semaine
 *
 * si current == 1 premier semaine
 * permet de calculer soit premier "jour (ex:lundi du mois")
 *
 * si current == 2 deuxieme semaine
 * permet de calculer soit deuxieme "jour (ex:lundi du mois")
 */
  traitementCurrentByMonth(current, date, maintenance) {
    if (current == 1) {

      date = moment(date, 'M YYYY').startOf('month').day(maintenance.day);
      maintenance.StartTime = this.firstWeek(date);



    } else if (current == 2) {
      date = moment(date, 'M YYYY').startOf('month').day(maintenance.day);
      date = this.firstWeek(date);


      // startOf('month) return first week of month day('maintenance.day') var with number of day add(7,'d') add 7 days up first day
      maintenance.StartTime = moment(date).add(7, 'd');


    } else if (current == 3) {
      date = moment(date, 'M YYYY').startOf('month').day(maintenance.day);
      date = this.firstWeek(date);
      // startOf('month) return first week of month day('maintenance.day') var with number of day add(14,'d') add 14 days up first day
      maintenance.StartTime = moment(date).add(14, 'd');
      // verifier si c'est pas 30 ou 31 modifier date

    } else {
      // endOF('month) return last week of month day('maintenance.day') var with number of day
      maintenance.StartTime = this.checkLastWeekofMonth(moment(date, 'M YYYY').endOf('month').day(maintenance.day));

      // maintenance.StartTime = moment(date, "M YYYY").endOf('month').day(maintenance.day);

    }
  }
  /**checkLastWeekofMonth(date)
   * 
   * @param date 
   * verifie si le numero du jour est inferieur a 10 si oui on recule d'une semaine
   */
  checkLastWeekofMonth(date) {

    if (date.format('DD') < 10) {
      date.add(-1, 'w');
      return date;
    }
    return date;
  }
  /**firstWeek(date)
   * 
   * @param date 
   * verifie si le numero du jour est superieur a 70 si oui on avance d'une semaine
   */
  firstWeek(date) {
    if (date.format('DD') > 20) {
      return date.add(1, 'w');
    } else {
      return date;
    }
  }
  /**traitementByMonth(maintenance, newMaintenances, date, time)
   * 
   * @param maintenance 
   * @param newMaintenances 
   * @param date 
   * @param time 
   * 
   * verification du roulement de maintenance via un nombre defini de fois a execute ou jusqu'une date de fin
   */
  traitementByMonth(maintenance, newMaintenances, date, time){
    if (maintenance.choix === 'current') {
      this.traitementCurrentByMonth(maintenance.current, date, maintenance);
      maintenance.StartTime = (moment(maintenance.StartTime.format('ll') + ' ' + time).format('llll'));
      this.traitementPlanByDay(maintenance, newMaintenances);

      maintenance.StartTime = date.add(maintenance.interval, 'M');
    } else {
      maintenance.StartTime = date.date(maintenance.dayOcc).format("llll");
      this.traitementPlanByDay(maintenance, newMaintenances);
      maintenance.StartTime = date.add(maintenance.interval, 'M');
    }
  }
  /**traitementPlanByDay(maintenance, newMaintenances) 
   * 
   * @param maintenance 
   * @param newMaintenances 
   * Traitement sur la durée de la maitenance par occurence
   */
  traitementPlanByDay(maintenance, newMaintenances) {
    maintenance.StartTime = moment(maintenance.StartTime).format('LLLL');
    maintenance.EndTime = this.addTime(moment(maintenance.StartTime, 'LLLL'), maintenance.duration);
   console.log(maintenance);
    const dayMain: DayMain = {
      codeBarre: maintenance.codeBarre,
      StartTime: maintenance.StartTime,
      EndTime: maintenance.EndTime,
      Subject: maintenance.maintenance,
      idMaintenance: maintenance.idMaintnance
    };

    newMaintenances.push(dayMain);

    maintenance.StartTime = moment(maintenance.StartTime, 'LLLL').add(maintenance.interval, 'days');

  }
  addTime(StartTime, duration) {
    // split  string nb unité (hours or minutes)
    const tab = duration.split(' ');
    let EndTime;
    let mesureTemps = tab[1];
    if (mesureTemps[0] === 'h' || mesureTemps[0] === 'H') { mesureTemps = 'hours'; }
    if (mesureTemps[0] === 'm' || mesureTemps[0] === 'M') { mesureTemps = 'm'; }

    EndTime = moment(StartTime, 'LLLL').add(tab[0], mesureTemps);
    return moment(EndTime).format('LLLL');

  }
  //#endregion


  
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
  codeBarre?: string;
}

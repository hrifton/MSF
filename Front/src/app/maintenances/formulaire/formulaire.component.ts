//#region
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
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
import * as moment from "moment";
import { Maintenance } from "src/app/Class/Maintenance";
import { MaintenanceService } from "src/app/Service/maintenance.service";
import { MatNativeDateModule } from "@angular/material";
import { Hospital } from "src/app/Class/Hospital";
import * as _ from "lodash";
//#endregion

// var momentDay = require('moment-weekdaysin');

@Component({
  selector: "app-formulaire",
  templateUrl: "./formulaire.component.html",
  styleUrls: ["./formulaire.component.css"]
})
export class FormulaireComponent {
  data: any;
  constructor(private fb: FormBuilder, private ms: MaintenanceService) {
    // this.createForm();
  }
  //#region Declaration Variable

  periode: any;
  @Input() maintenance: any;
  @Input() techs: any;
  @Input() projet: any;
  @Input() lrepeat: any;
  @Input() lEnd: any;
  @Output() messageEvent = new EventEmitter<any>();
  maintenanceForm: FormGroup;
  minDate = new Date();
  // hasUnitNumber = false;

  @ViewChild("checkbox")
  public mulObj: MultiSelectComponent;
  @ViewChild("selectall")
  public checkboxObj: CheckBoxComponent;
  @ViewChild("dropdown")
  public dropdownObj: CheckBoxComponent;
  @ViewChild("select")
  public reorderObj: CheckBoxComponent;
  public mode: string;
  public filterPlaceholder: string;
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
  // map the groupBy field with category column
  public checkFields: Object = { text: "Name", value: "Code" };
  // set the placeholder to the MultiSelect input
  public checkWaterMark = "Select Day(s)";
  // set the MultiSelect popup height
  public popHeight = "350px";
  //#endregion

  createForm(data?) {
    if (data) {
      console.log(data, this.projet);
      this.maintenanceForm = this.fb.group({
        name: new FormControl(data.name ? data.name : "", [
          Validators.required
        ]),
        categorie: new FormControl(data.categorie, [Validators.required]),
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
        startUntil: new FormControl(data.startUntil ? data.startUntil : ""),
        count: new FormControl(data.count ? data.count : ""),

        endUntil: new FormControl(data.endUntil ? data.endUntil : ""),
        end: new FormControl(data.end ? data.end : ""),
        codeBarre: new FormControl(data.codeBarre ? data.codeBarre : ""),
        listDay: new FormControl(data.listDay ? data.listDay : ""),
        dayOcc: new FormControl(data.dayOcc ? data.dayOcc : ""),
        current: new FormControl(data.current ? data.current : ""),
        day: new FormControl(data.day ? data.day : ""),
        tech: new FormControl(""),
        month: new FormControl(data.month ? data.month : "")
      });
    } else {
      this.maintenanceForm = this.fb.group({
        name: new FormControl("", [Validators.required]),
        categorie: new FormControl("", [Validators.required]),
        subCat: new FormControl("", [Validators.required]),
        interval: new FormControl("", [Validators.required]),
        periodicity: new FormControl("", [Validators.required]),
        end: new FormControl("", [Validators.required]),
        recurrence: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        listDay: new FormControl("", [Validators.required]),
        StartTime: new FormControl("", [Validators.required]),
        count: new FormControl(""),
        startUntil: new FormControl(""),
        endUntil: new FormControl(""),
        tech: new FormControl(""),
        codeBarre: new FormControl("")
      });
    }
  }

  public onChange(args: any): void {
    // TODO Hicham trouver une solution

    if (args.itemData != undefined) {
      this.onSelection(args.itemData);
    }
    //this.mulObj.showSelectAll = this.checkboxObj.checked;
  }

  ngOnInit() {
    this.createForm();
    console.log(this.techs);
    this.data = this.maintenance;
    const recurrObject: RecurrenceEditor = new RecurrenceEditor({});
    this.mode = "CheckBox";
    this.filterPlaceholder = "Select Day(s)";
  }
  /**
   * @param value
   * Value est la maintenance qui auto-completera le formulaire avec ces valeurs par defaut
   */
  onSelection(value) {
    // don't work with function ??  this.createForm(value);
    //this.periode = value.periodicity;
    console.log(value)
   /* let categorie = this.getNameCategorie(
      value.categorie,
      this.projet[0].metier
    );*/
    this.maintenanceForm = this.fb.group({
      idMaintnance: new FormControl(value._id, [Validators.required]),
      name: new FormControl(value.name, [Validators.required]),
      categorie: new FormControl(value.categorie, [Validators.required]),
      idcategorie: new FormControl(value.categorie, [Validators.required]),
      subCat: new FormControl(value.subCat, [Validators.required]),
      periodicity: new FormControl(value.periodicity, [Validators.required]),
      recurrence: new FormControl(value.recurrence, [Validators.required]),
      description: new FormControl(value.description, [Validators.required]),
      count: new FormControl(value.count, [Validators.required]),
      startUntil: new FormControl(value.startUntil),
      endUntil: new FormControl(value.endUntil),
      listDay: new FormControl(value.listDay, [Validators.required]),
      end: new FormControl(value.end, [Validators.required]),
      interval: new FormControl(value.interval),
      dayOcc: new FormControl(value.dayOcc, [Validators.required]),
      day: new FormControl(value.day, [Validators.required]),
      choix: new FormControl(value.choix, [Validators.required]),
      current: new FormControl(value.current, [Validators.required]),
      tech: new FormControl("", [Validators.required])
    });
  }
  /**
   * Save Maintenance Switch en fonction de la périodicité
   */
  saveDate(maintenance) {
     console.log("Save Date : ", maintenance.value);
    console.log("Save Date : ", maintenance.value.periodicity);
    switch (maintenance.value.periodicity) {
      case "Daily": {
        this.saveDaily(maintenance.value);
        break;
      }
      case "Weekly": {
        this.saveWeekly(maintenance.value);
        break;
      }
      case "Monthly": {
        this.saveMonthly(maintenance.value);
        break;
      }
      case "Yearly": {
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
    console.log("traitement Yearly");
    console.log(maintenance.end);
  }
  //#endregion

  //#region save by Month
  saveMonthly(maintenance) {
    if (maintenance.end === "Until") {
      this.planMonthlyUntil(maintenance);
    } else {
      this.planMonthlyCount(maintenance);
    }
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
    const month = moment(maintenance.StartTime).format("MM");
    const year = parseInt(moment(maintenance.StartTime).format("YYYY"));
    const time = moment(maintenance.StartTime).format("LT");
    // create date with month and year
    const date = moment(month + "" + year, "M/YYYY");

    // array for stock new Maintenance
    const newMaintenances: any = [];

    // loop for nomber occurence ask
    for (let index = 0; index < maintenance.count; index++) {
      // this.traitementCurrentByMonth(maintenance.current, date, maintenance);
      // maintenance.StartTime = (moment(maintenance.StartTime.format('ll') + ' ' + time).format('l'));
      // this.traitementPlanByDay(maintenance, newMaintenances);
      // date.add(maintenance.interval, 'M');
      this.traitementByMonth(maintenance, newMaintenances, date, time);
    }

    this.messageEvent.emit(newMaintenances);
    //this.createForm();
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
    const time = moment(maintenance.StartTime).format("LT");
    const month = moment(maintenance.StartTime).format("M");
    const year = moment(maintenance.StartTime).format("YYYY");
    const date = moment(month + " " + year, "M YYYY").day(maintenance.day);

    while (moment(maintenance.StartTime).isBefore(moment(maintenance.until))) {
      this.traitementByMonth(maintenance, newMaintenances, date, time);
    }
    this.messageEvent.emit(newMaintenances);
    //this.createForm();
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
    if (maintenance.end === "Until") {
      this.planWeekUntil(maintenance);
    } else {
      this.planWeekCount(maintenance);
    }
  }

  /**
   *
   * @param maintenance
   *
   * traitement du planning par semaine avec nombre de repétition determiner
   */
  planWeekCount(maintenance: any) {
    //TODO Correction doit ajouté date de part dans le formulaire

    const newMaintenances: any = [];
    maintenance.StartTime = maintenance.startUntil;
    for (let index = 0; index < maintenance.count; index++) {
      maintenance.listDay.forEach(element => {
        const date = moment().day(element);
        //.week(nbWeek + index)
        //.format("LL");
        console.log(date, element);
        maintenance.StartTime = date;
        // this.traitementPlanByDay(maintenance, newMaintenances);
        maintenance.StartTime = moment(maintenance.StartTime).add(
          maintenance.interval,
          "weeks"
        );
        console.log(maintenance.StartTime);
      });
      console.log(maintenance.StartTime, maintenance.interval);
      maintenance.StartTime = moment(maintenance.StartTime).add(
        maintenance.interval,
        "w"
      );
    }

     console.log(newMaintenances)

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
    maintenance.StartTime = maintenance.startUntil;

    while (moment(maintenance.StartTime).isBefore(maintenance.endUntil)) {
      nbWeek = moment(moment(maintenance.StartTime)).week();

      maintenance.listDay.forEach(element => {
        const date = moment()
          .day(element)
          .week(nbWeek);

        maintenance.StartTime = date;

        this.traitementPlanByDay(maintenance, newMaintenances);
      });

      maintenance.StartTime = moment(maintenance.StartTime).add(
        maintenance.interval,
        "weeks"
      );
      console.log(moment(maintenance.StartTime).format("LLLL"));
    }
    // this.messageEvent.emit(newMaintenances);
    //this.createForm();
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
    console.log("SaveDaily", maintenance.end);
    if (maintenance.end === "Until") {
      this.planDayUntil(maintenance);
    } else {
      this.planDayCount(maintenance);
    }
  }

  // TODO Hicham Date depasse tjs de 1
  planDayUntil(maintenance) {
    const newMaintenances: any = [];
    maintenance.StartTime = maintenance.startUntil;
    //As long as the date is not reached
    while (moment(maintenance.StartTime).isBefore(maintenance.endUntil)) {
      //Function add day interval
      this.traitementPlanByDay(maintenance, newMaintenances);
    }
    //Seed to Component parent for save to DB
    this.messageEvent.emit(newMaintenances);
    //create a new form
    this.createForm();
  }

  planDayCount(maintenance) {
    const newMaintenances: any = [];
    for (let index = 1; index <= maintenance.count; index++) {
      this.traitementPlanByDay(maintenance, newMaintenances);
    }
    console.log(newMaintenances);
    this.messageEvent.emit(newMaintenances);
    //this.createForm();
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
      date = moment(date, "M YYYY")
        .startOf("month")
        .day(maintenance.day);
      maintenance.StartTime = this.firstWeek(date);
    } else if (current == 2) {
      date = moment(date, "M YYYY")
        .startOf("month")
        .day(maintenance.day);
      date = this.firstWeek(date);

      // startOf('month) return first week of month day('maintenance.day') var with number of day add(7,'d') add 7 days up first day
      maintenance.StartTime = moment(date).add(7, "d");
    } else if (current == 3) {
      date = moment(date, "M YYYY")
        .startOf("month")
        .day(maintenance.day);
      date = this.firstWeek(date);
      // startOf('month) return first week of month day('maintenance.day') var with number of day add(14,'d') add 14 days up first day
      maintenance.StartTime = moment(date).add(14, "d");
      // verifier si c'est pas 30 ou 31 modifier date
    } else {
      // endOF('month) return last week of month day('maintenance.day') var with number of day
      maintenance.StartTime = this.checkLastWeekofMonth(
        moment(date, "M YYYY")
          .endOf("month")
          .day(maintenance.day)
      );

      // maintenance.StartTime = moment(date, "M YYYY").endOf('month').day(maintenance.day);
    }
  }
  /**checkLastWeekofMonth(date)
   *
   * @param date
   * verifie si le numero du jour est inferieur a 10 si oui on recule d'une semaine
   */
  checkLastWeekofMonth(date) {
    if (date.format("DD") < 10) {
      date.add(-1, "w");
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
    if (date.format("DD") > 20) {
      return date.add(1, "w");
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
  traitementByMonth(maintenance, newMaintenances, date, time) {
    if (maintenance.choix === "current") {
      this.traitementCurrentByMonth(maintenance.current, date, maintenance);
      maintenance.StartTime = moment(
        maintenance.StartTime.format("ll") + " " + time
      ).format("LLLL");
      this.traitementPlanByDay(maintenance, newMaintenances);

      maintenance.StartTime = date.add(maintenance.interval, "M");
    } else {
      maintenance.StartTime = date.date(maintenance.dayOcc).format("LLLL");
      this.traitementPlanByDay(maintenance, newMaintenances);
      maintenance.StartTime = date.add(maintenance.interval, "M");
    }
  }
  /**traitementPlanByDay(maintenance, newMaintenances)
   *
   * @param maintenance
   * @param newMaintenances
   * Traitement sur la durée de la maitenance par occurence
   */
  traitementPlanByDay(maintenance, newMaintenances) {
    let dateRefStart;
    if (maintenance.StartTime == undefined) {
      dateRefStart = maintenance.startUntil;
      maintenance.StartTime = maintenance.startUntil;
    } else {
      dateRefStart = maintenance.StartTime;
    }

    //maintenance.StartTime = moment(maintenance.StartTime).format("LLLL");
    console.log(maintenance.StartTime);

    /* Si notion de temps a rajouté en H ou M (MSF demande à le retiré)
    maintenance.EndTime = this.addTime(
      moment(maintenance.StartTime, "LLLL"),
      maintenance.duration
    );*/
    //create date maintenance
    const dayMain: DayMain = {
      codeBarre: maintenance.codeBarre,
      StartTime: maintenance.StartTime,
      EndTime: maintenance.StartTime,
      description: maintenance.name,
      idMaintenance: maintenance.idMaintnance,
      subCat: maintenance.subCat,
      categorie: maintenance.categorie,
      status: "Open",
      idTech: maintenance.tech,
      idHopital: this.projet[0]._id
    };
    console.log(dayMain);
    //push date maintenance to array
    newMaintenances.push(dayMain);
    //add Interval day
    maintenance.StartTime = moment(dateRefStart).add(maintenance.interval, "d");
  }
  addTime(StartTime, duration) {
    // split  string nb unité (hours or minutes)
    const tab = duration.split(" ");
    let EndTime;
    let mesureTemps = tab[1];
    if (mesureTemps[0] === "h" || mesureTemps[0] === "H") {
      mesureTemps = "hours";
    }
    if (mesureTemps[0] === "m" || mesureTemps[0] === "M") {
      mesureTemps = "m";
    }

    EndTime = moment(StartTime, "LLLL").add(tab[0], mesureTemps);
    return moment(EndTime).format("LLLL");
  }

  getNameCategorie(idCategorie, metier) {
    console.log(idCategorie, metier);
    let index = _.findIndex(metier, function(o) {
      return o._id == idCategorie;
    });
    return metier[index].name;
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
  description?: string;
  idMaintenance?: any;
  codeBarre?: string;
  idTech?: string;
  status:string;
  idHopital?: Object;
  categorie?:string;
  subCat?:string;
}

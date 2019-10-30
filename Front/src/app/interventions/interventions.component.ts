import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Internationalization } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, AgendaService, TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

/**
 * Import service
 */
import { UserService } from '../Service/user.service';
import { InterventionService } from './../Service/intervention.service';
import { DateMaintenanceService } from '../Service/dateMaintenance.service';
import { DepartementService } from '../Service/departement.service';
import { MetierService } from '../Service/metier.service';



/**
 * import component
 */
import { AnalyseMixIntermaintComponent } from '../analyse-mix-intermaint/analyse-mix-inter-maint.component';
import { ListInterventionComponent } from './list-intervention/list-intervention.component';

/**
 * import class
 */
import { User } from '../Class/user';
import Intervention from '../Class/Intervention';
import { Hospital } from '../Class/Hospital';
/** import moment outil parsing et modification  */
import * as moment from 'moment';
import * as _ from 'lodash';
import { HopitalService } from '../Service/hopital.service';


@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  encapsulation: ViewEncapsulation.None
})
export class InterventionsComponent implements OnInit {
  public interventions: Intervention[];
  public metier: Object = [];
  public maintenance: any = [];
  public compte = [];
  public departements: any = [];

  public eventSettings: EventSettingsModel = {};

  userDetails;
  techs: User[];

  @ViewChild(ListInterventionComponent)
  interentionList: ListInterventionComponent;

  @ViewChild(AnalyseMixIntermaintComponent)
  AnalyseMixIntermaint: AnalyseMixIntermaintComponent;
  public statusInsertIntervention: boolean;
  projet: Hospital;
  hopital: any;
  /**
   *
   * @param is service intervention
   * @param us service user
   * @param ds service dateMaintenance
   * @param metierSservice metier
   */
  constructor(
    private is: InterventionService,
    private us: UserService,
    private ds: DateMaintenanceService,
    private metierS: MetierService,
    private deps: DepartementService,
    private hs:HopitalService
  ) {
    this.interventions = [];
    this.maintenance = [];
    this.statusInsertIntervention = null;
    this.eventSettings.dataSource = [];
    this.hopital=null;
  }

  /**
   * @param $event
   * est appellé depuis le component Liste Intervention pour mise a jour de la liste intervention
   *  unshift ajoute data de event dans le tableau interventions
   *
   * Modification de la variable @statusInsertIntervention envoyé a formulaire intervention pour affichage TOAST
   */
  update($event) {
    $event.idUser = this.us.getId();
    $event.type = 'JobRequest';
    $event.status = 'Open';
    $event.day = moment().format('DD/MM/YYYY');
    $event.idHopital = this.us.getIdHopital();
    this.is.postInter($event).subscribe((data: Intervention) => {
      if (typeof data.slug === 'number') {
        data.user = [];
        const u = new User();
        u.fullName = this.us.getFullName();
        data.user.push(u);
        data.tech = '';
        data.departements = [];
        data.departements.push(this.returnDepartement(data));
        this.interventions.unshift(data);
 
        this.interentionList.refreshInterventionTable();
        this.AnalyseMixIntermaint.refreshChart();
        this.statusInsertIntervention = true;
      } else {
        this.statusInsertIntervention = false;
      }
    });
    this.interentionList.refreshInterventionTable();
  }
  returnDepartement(data: Intervention): any {
   const found = this.departements.find(function(element) {
       if (element._id === data.idDepartement) {
          return element
       }
        });
   return found;

  }
  check($event) {
    const inter = new Intervention(
      $event.departement,
      $event.hopital,
      $event.locality,
      $event.priority,
      $event.day,
      $event.description,
      $event.status,
      $event.user,
      $event.type,
      $event.tech,
      $event._id,
      $event.useMat,
      $event.asset,
      $event.slug,
      $event.metier
    );
    this.is.updateIntervention(inter).subscribe((data: Intervention) => {
      this.getInterventionByRole();
    });

    // this.interentionList.refreshInterventionTable();
    // this.AnalyseMixIntermaint.refreshChart();
  }

  ngOnInit() {
    /**
     * assignation statut de l'utilisateur
     */
    this.userDetails = this.us.getStatus();
    /**
     * gestion Du type d'utilisateur
     */
    this.getInterventionByRole();
    /**
     * return liste des technicien
     */
    this.us.getUserTech().subscribe((data: User[]) => {
      this.techs = data;
    });
    /**
     * return liste des deparement
     */
    this.metierS.getMetiers().subscribe(data => {
      this.metier = data;
    });
    this.hs.findHopital(this.us.getIdHopital()).subscribe(data => {
      console.log(data)
      this.departements = data[0].departements;
    });
  }
  /**
   *
   * @param metier
   * @param intervention
   * compte le nombre d'intervention par metier (corp de métier)
   */
  // TODO verification du compte
  comptemetier(metier, intervention) {
    for (let index = 0; index < metier.length; index++) {
      const name = metier[index].name;
      this.compte[index] = { name, nb: 0 };
    }
    intervention.forEach(element => {
      if (element.status !== 'Canceled' && element.status !== 'Done') {
        for (let index = 0; index < this.compte.length; index++) {
          if (element.metier.length > 0) {
            if (this.compte[index].name === element.metier[0].name) {
              this.compte[index].nb += 1;
              break;
            }
          }
        }
      }
    });
  }

  getInterventionByRole() {
    if (
      this.us.getIdHopital() === 'undefined' ||
      this.us.getIdDepartement() === 'undefined'
    ) {
      // TODO REdirection si manque idHopital ou idDepartement
      console.log('redirection:', this.us.getIdDepartement());
    } else {
    }
    if (this.userDetails === 'User') {
      this.is.getInterventionsByUser().subscribe((data: Intervention[]) => {
        this.interventions = data;
      });
    } else if (this.userDetails === 'tech') {
      this.is
        .getInterventionsBytech(this.us.getFullName())
        .subscribe((data: Intervention[]) => {

          this.interventions = this.dateToAgenda(data);
          this.eventSettings.dataSource = this.dateToAgenda(data);
          console.log(data);
        });
    } else if (this.userDetails === 'Admin') {
    
      this.is.getInterventions().subscribe((data: any[]) => {
        this.ds.getMaintenanceAndIntervention().subscribe((maindata: any[]) => {
          maindata.forEach(element => {
            if (element.resultat.length <= 0) {
              const inter = {
                _id: element.idMaintenance,
                day: moment(element.StartTime).format('DD/MM/YYYY'),
                departement: '',
                description: '',
                locality: '',
                priority: 'Medium',
                status: 'In process',
                tech: '',
                type: 'Maintenance',
                user: ''
              };
              data.push(inter);
            } else {
              const inter = {
                _id: element.idMaintenance,
                day: moment(element.StartTime).format('DD/MM/YYYY'),
                departement: element.resultat[0].executor,
                description: element.resultat[0].description,
                locality: '',
                priority: 'Medium',
                status: 'In process',
                tech: '',
                type: 'Maintenance',
                user: ''
              };
              data.push(inter);
            }
          });
          this.interventions = data;
          this.comptemetier(this.metier, this.interventions);

          // this.interventions.sort((a, b) => (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0));
        });
      });
             this.hs.findHopital(this.us.getIdHopital()).subscribe((data: Hospital) => {
        this.projet = data});
    } else {
      console.log('super Admin  *******************');
    }
  }
  dateToAgenda(data: Intervention[]) {
    for (const i in data) {
      const dateString = data[i].day;
      const year = dateString.substr(6, 10);
      const month = dateString.substr(3, 5);
      const day = dateString.substr(0, 2);
      console.log(year, month, day);
      console.log(data[i].day[1]);
      // data[i].StartTime = new Date(Date.parse(data[i].day));
      console.log(data[i].StartTime);
      // data[i].EndTime = new Date(Date.parse(Date(data[i].day)));
    }
    return data;
  }
  /**
   *
   * @param $event Modification status lors de l'insertion d'une intervention
   */
  modifieStatus($event) {
    this.statusInsertIntervention = $event;
  }
}

import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

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
/** import moment outil parsing et modification  */
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  encapsulation: ViewEncapsulation.None
})
export class InterventionsComponent implements OnInit {
  public interventions: Intervention[];
  public metier: Object = [];
  public maintenance: any = [];
  public compte: Object = [];
  public departements: Object = [];

  userDetails;
  techs: User[];

  @ViewChild(ListInterventionComponent)
  interentionList: ListInterventionComponent;

  @ViewChild(AnalyseMixIntermaintComponent)
  AnalyseMixIntermaint: AnalyseMixIntermaintComponent;
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
    private deps: DepartementService
  ) {
    this.interventions = [];
    this.maintenance = [];
  }

  /**
   * @param $event
   * est appellé depuis le component Liste Intervention pour mise a jour de la liste intervention
   *  unshift ajoute data de event dans le tableau interventions
   */
  update($event) {
    $event.idUser = this.us.getId();
    $event.type = 'JobRequest';
    $event.status = 'In progress';
    $event.day = moment().format('DD/MM/YYYY');
    $event.idHopital = this.us.getIdHopital();

    this.is.postInter($event).subscribe((data: Intervention) => {
      this.interventions.unshift(data);
      this.interentionList.refreshInterventionTable();
      this.AnalyseMixIntermaint.refreshChart();
    });

    // this.HistoricIntervention.refreshChart();
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
    console.log(inter);
    this.is.updateIntervention(inter).subscribe((data: Intervention) => {
      console.log('update : ', data);
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
    this.deps.getDepartements().subscribe(data => {
      this.departements = data;
    });
  }
  /**
   *
   * @param metier
   * @param intervention
   * compte le nombre d'intervention par metier (corp de métier)
   */
  comptemetier(metier, intervention) {
    console.log(metier);
    for (let index = 0; index < metier.length; index++) {
      const name = metier[index].name;
      this.compte[index] = { name, nb: 0 };
    }
    intervention.forEach(element => {
      if (element.status !== 'Canceled' && element.status !== 'Closed') {
        for (const key in this.compte) {
          if (this.compte.hasOwnProperty(key)) {
            if (this.compte[key].name === element.metier) {
              this.compte[key].nb++;
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
          this.interventions = data;
        });
    } else {
      alert('superieur');
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
    }
  }
}

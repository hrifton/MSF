import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";

/**
 * Import service
 */
import { UserService } from "../Service/user.service";
import { InterventionService } from "./../Service/intervention.service";
import { DateMaintenanceService } from "../Service/dateMaintenance.service";
import { DomaineService } from "../Service/domaine.service";
/**
 * import component
 */
import { AnalyseMixIntermaintComponent } from "../analyse-mix-intermaint/analyse-mix-inter-maint.component";
import { ListInterventionComponent } from "./list-intervention/list-intervention.component";

/**
 * import class
 */
import { User } from "../Class/user";
import Intervention from "../Class/Intervention";
/** import moment outil parsing et modification  */
import * as moment from "moment";

@Component({
  selector: "app-interventions",
  templateUrl: "./interventions.component.html",
  encapsulation: ViewEncapsulation.None
})
export class InterventionsComponent implements OnInit {
  public interventions: Intervention[];
  public domaine: Object = [];
  public maintenance: any = [];
  public compte: Object = [];
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
   * @param doms service domaine
   */
  constructor(
    private is: InterventionService,
    private us: UserService,
    private ds: DateMaintenanceService,
    private doms: DomaineService
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
    this.interventions.unshift($event);
    this.interentionList.refreshInterventionTable();
    // this.HistoricIntervention.refreshChart();
  }
  check($event) {
    console.log("inter closed :", $event);
  }

  ngOnInit() {
    /**
     * assignation statut de l'utilisateur
     */
    this.userDetails = this.us.getStatus();
    /**
     * gestion Du type d'utilisateur
     */
    if (this.userDetails === "user") {
      this.is
        .getInterventionsByUser(this.us.getFullName())
        .subscribe((data: Intervention[]) => {
          this.interventions = data;
        });
    } else if (this.userDetails === "tech") {
      this.is
        .getInterventionsBytech(this.us.getFullName())
        .subscribe((data: Intervention[]) => {
          this.interventions = data;
        });
    } else {
      this.is.getInterventions().subscribe((data: any[]) => {
        this.ds.getMaintenanceAndIntervention().subscribe((maindata: any[]) => {
          maindata.forEach(element => {
            if (element.resultat.length <= 0) {
              const inter = {
                _id: element.idMaintenance,
                day: moment(element.StartTime).format("DD/MM/YYYY"),
                departement: "",
                description: "",
                locality: "",
                priority: "Medium",
                status: "In process",
                tech: "",
                type: "Maintenance",
                user: ""
              };
              data.push(inter);
            } else {
              const inter = {
                _id: element.idMaintenance,
                day: moment(element.StartTime).format("DD/MM/YYYY"),
                departement: element.resultat[0].executor,
                description: element.resultat[0].description,
                locality: "",
                priority: "Medium",
                status: "In process",
                tech: "",
                type: "Maintenance",
                user: ""
              };
              data.push(inter);
            }
          });
          this.interventions = data;
          this.compteDomaine(this.domaine, this.interventions);

          // this.interventions.sort((a, b) => (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0));
        });
      });
    }
    /**
     * return liste des technicien
     */
    this.us.getUserTech().subscribe((data: User[]) => {
      this.techs = data;
    });
    /**
     * return liste des deparement
     */
    this.doms.getAll().subscribe(data => {
      this.domaine = data;
    });
  }
  /**
   *
   * @param domaine
   * @param intervention
   * compte le nombre d'intervention par domaine (corp de métier)
   */
  compteDomaine(domaine, intervention) {
    console.log(intervention.length);
    for (let index = 0; index < domaine.length; index++) {
      const name = domaine[index].domaine;
      this.compte[index] = { name, nb: 0 };
    }
    intervention.forEach(element => {
      if (element.status !== "Canceled" && element.status !== "Closed") {
        for (const key in this.compte) {
          if (this.compte.hasOwnProperty(key)) {
            if (this.compte[key].name === element.domaine) {
              this.compte[key].nb++;
            }
          }
        }
      }
    });
  }
}

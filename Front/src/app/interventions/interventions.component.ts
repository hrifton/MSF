import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { EventSettingsModel } from "@syncfusion/ej2-angular-schedule";

/**
 * Import service
 */
import { UserService } from "../Service/user.service";
import { InterventionService } from "./../Service/intervention.service";
import { DateMaintenanceService } from "../Service/dateMaintenance.service";
import { MetierService } from "../Service/metier.service";
import { SolutionService } from "../Service/solution.service";
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
import { Hospital } from "../Class/Hospital";
/** import moment outil parsing et modification  */
import * as moment from "moment";
import * as _ from "lodash";
import { HopitalService } from "../Service/hopital.service";
import Solution from "../Class/Solution";
import { CalendrierTechComponent } from "./calendrier-tech/calendrier-tech.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Categorie } from '../Class/Categorie';

@Component({
  selector: "app-interventions",
  templateUrl: "./interventions.component.html",
  styleUrls: ["./interventions.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class InterventionsComponent implements OnInit {
  public interventions: any[];
  public metier: Object = [];
  public maintenance: any = [];
  public compte = [];
  public departements: any = [];

  public eventSettings: EventSettingsModel = {};
  @ViewChild("element") element;
  @ViewChild(NavBarComponent)
  navBar: NavBarComponent;
  userDetails;
  techs: User;

  @ViewChild(ListInterventionComponent)
  interentionList: ListInterventionComponent;
  @ViewChild(CalendrierTechComponent)
  calendrierTech: CalendrierTechComponent;
  @ViewChild(AnalyseMixIntermaintComponent)
  AnalyseMixIntermaint: AnalyseMixIntermaintComponent;
  public statusInsertIntervention: boolean;
  projet: Hospital;
  hopital: any;
  show: boolean = false;
  flagErrorFormTech: boolean = false;
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
    private hs: HopitalService,
    private ss: SolutionService
  ) {
    this.interventions = [];
    this.maintenance = [];
    this.statusInsertIntervention = null;
    this.eventSettings.dataSource = [];
    this.hopital = null;
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
     * return liste des deparement
     */
    this.metierS.getMetiers().subscribe(data => {
      this.metier = data;
    });
  }
  /**
   * @param $event
   * est appellé depuis le component Liste Intervention pour mise a jour de la liste intervention
   *  unshift ajoute data de event dans le tableau interventions
   *
   * Modification de la variable @statusInsertIntervention envoyé a formulaire intervention pour affichage TOAST
   */
  saveIntervention($event) {
    $event.idUser = this.us.getId();
    $event.type = "JobRequest";
    $event.status = "New";
    $event.day = new Date();
    $event.idHopital = this.us.getIdHopital();
    this.is.postInter($event).subscribe((data: Intervention) => {
      if (typeof data.slugI === "number") {
        data.user = [];
        const u = new User();
        u.fullName = this.us.getFullName();
        data.user.push(u);
        data.tech = "";
        data.departements = [];
        data.departements.push(this.returnDepartement(data));
        if (!this.interventions) {
          this.interventions = [];
          this.interventions.unshift(data);
        } else {
          this.interventions.unshift(data);
        }
        this.formatDate()
        this.interentionList.refreshInterventionTable();
        this.AnalyseMixIntermaint.refreshChart();
        this.statusInsertIntervention = true;
      } else {
        this.statusInsertIntervention = false;
      }
    });
    this.interentionList.refreshInterventionTable();
  }

  updateInterventionMaintenance($event) {
    //If mise a jour to maintenance
    if (this.userDetails != "Tech") {
      $event.tech = this.findTechInList(this.techs, $event.idTech)
    } else {
      $event.tech = this.us.getFullName();
    }

    if ($event.idMaintenance) {
      //Ajout solution pour Date Maintenance
      if ($event.solution) {
        this.ds.addSolution($event).subscribe(data => {
          console.log(data)
          //TODO Mise a jour de la liste
        })
      }
      //Modification Maintenance
      else {
        $event.StartTime = new Date($event.StartTime).toISOString();
        this.remplaceById(this.interventions, $event)
        this.ds.updateWithOutSolution($event).subscribe(data => {
          this.formatDate()
          this.AnalyseMixIntermaint.refreshChart()
          this.interentionList.refreshInterventionTable();
        })


      }
    }
    //else mise a jour Intervention
    else {
      if ($event.solution) {
        /**
         * ajout d'une solution
         */
        console.log("AddSolution : ", $event);
        this.is.addSolution($event).subscribe(data => {
          console.log(data);
        });
        this.getInterventionByRole();
      } else {
        /**
         * Modification de l'intervention (technicien, categorie, subCategorie, priorité)
         */
        console.log("Modifie Intervention");
        this.is.updateIntervention($event).subscribe((data: Intervention) => {
          this.getInterventionByRole();
        });
      }
    }




    //this.interentionList.refreshInterventionTable();
    //this.AnalyseMixIntermaint.refreshChart();
  }

  /**
   *
   * @param metier
   * @param intervention
   * compte le nombre d'intervention par metier (corp de métier)
   */
  // TODO verification du compte
  comptemetier(metier, intervention) {
    console.log('Categorie 7777777', metier);
    for (let index = 0; index < metier.length; index++) {
      const name = metier[index].name;
      const _id = metier[index]._id;
      this.compte[index] = { name, _id, nb: 0 };
    }
    intervention.forEach(element => {
      console.log(element);
      if (element.status !== "Canceled" && element.status !== "Done") {
        for (let index = 0; index < this.compte.length; index++) {
          if (element.metier != undefined) {
            console.log(element.metier, this.compte[index]);
            if (this.compte[index]._id === element.metier) {
              this.compte[index].nb += 1;
              break;
            }
          }
        }
      }
    });
    if (this.projet) {
      this.show = true;
    }
  }
  /**
   *
   *
   * @memberof InterventionsComponent
   */
  getInterventionByRole() {
    if (
      this.us.getIdHopital() === "undefined" ||
      this.us.getIdDepartement() === "undefined"
    ) {
      if (this.us.getStatus() != "SuperAdmin") {
        // TODO REdirection si manque idHopital ou idDepartement
        console.log("redirection:", this.us.getIdDepartement());
      }
    } else {
    }
    //If status is USER
    if (this.userDetails === "User") {
      this.findHospital();
      this.is.getInterventionsByUser().subscribe((data: Intervention[]) => {
        this.interventions = data;
        this.show = true;
      });
      this.show = true;

      this.departements = this.us.getIdDepartement();
    } //If status is TECH
    else if (this.userDetails === "Tech") {
      this.findHospital();
      this.is
        .getInterventionsBytech(this.us.getId())
        .subscribe((data: any[]) => {
          console.log(this.interventions.length)
          //this.interventions=data
          console.log(this.interventions.length);
          this.ds
            .getDateMaintenanceByTech(this.us.getId())
            .subscribe((dataMaint: any) => {
              console.log(data);
              console.log(this.interventions.length);
              this.interventions = _.concat(dataMaint, data);
              console.log(this.interventions.length);

              this.formatDate();
              this.show = true;
            });
        });
      console.log(this.maintenance)
      this.formatDate();
      console.log(this.projet);
      this.show = true;
    } //If status is ADMIN
    else if (this.userDetails === "Admin" || this.userDetails == "Operator") {
      //return liste Tech
      this.findTechByHospital();
      //return info hospital
      this.hs
        .findHopital(this.us.getIdHopital())
        .subscribe((data: Hospital) => {
          this.projet = data;
          this.departements = data[0].departements;
          //return Intervention by month current + all intervention open or waiting out of month
          this.is.getInterventions().subscribe((data: any[]) => {
            this.ds
              //return all maintenance programming of Hospital
              .getMaintenanceByHospitalAndDate()
              .subscribe((maindata: any[]) => {
                if (this.interventions.length > 0) {
                  this.interventions = _.concat(data, maindata);
                } else {
                  this.interventions = _.concat(data, maindata);
                }

                console.log('in Admin : ', this.interventions)
                this.formatDate();
                console.log(this.interventions);
                if (this.interventions.length > 0) {

                  this.remplaceIdCatByNameCat();
                  this.comptemetier(this.projet[0].metier, this.interventions);
                }

                // this.interventions.sort((a, b) => (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0));
              });
            this.formatDate();
          });
          this.formatDate();
        });
      //this.comptemetier(this.projet[0].metier, this.interventions);
      this.show = true;
      //If Status is SuperAdmin
    } else if (this.userDetails === "SuperAdmin") {
      console.log("super Admin  *******************");
    } else {
      console.log("Error return to login");
    }
  }
  remplaceIdCatByNameCat() {
    let categorie = this.projet[0].metier;

    this.interventions.forEach(element => {
      if (element.idMaintenance == undefined && element.status != "New") {
        let index = _.findIndex(categorie, function (c) {
          return element.metier == c._id;
        });
        console.log(index, element)
        element.categorie = categorie[index].name;
      }

    });
  }
  formatDate() {
    this.interventions.forEach(element => {
      if (element.idMaintenance) {
        element.type = "Maintenance";
        element.StartTime = moment(element.StartTime).format("LL");
        element.EndTime = element.StartTime;
        element.day = element.StartTime;

      } else {
        console.log(element);
        element.day = moment(element.day).format("LL");
        element.dateAssing = moment(element.dateAssing).format("LL");
        element.StartTime = element.day;
        element.EndTime = element.day;
        console.log(element);
        if (typeof element.metier == "string")
          element.categorie = this.returnCategorie(element.metier);
      }

      if (this.userDetails != "Tech" && element.status != "New") {
        console.log("go findTech", element)
        element.tech = this.findTechInList(this.techs, element.idTech);
      }
    });
  }




  showToastError(toast: string) {
    if (toast == "Duplicate") {
      this.element.content =
        "<div class='e-custom'><center>This hospital exists</center></div>";
    }
    this.element.title = "<center>Error</center>";

    this.element.cssClass = "e-toast-danger";
    this.element.show({ timeOut: 4000 });
  }

  showToast(toast: string) {
    this.element.title = "<center>Success</center>";
    // this.element.animation.show.effect = 'FlipRightDownIn';
    if (toast == "addNewHopital") {
      this.element.content =
        "<div class='e-custom'><center>New hospital add</center></div>";
    }

    this.element.cssClass = "e-toast-success";
    this.element.show({ timeOut: 4000 });
  }
  remplaceIntervention(data, status) {
    let index = _.findIndex(this.interventions, function (o) {
      return o._id == data.idIntervention;
    });
    this.interventions[index].status = status;

    this.calendrierTech.refreshAgenda();
  }

  /**
   * return info hopital
   */
  findHospital() {
    this.hs.findHopital(this.us.getIdHopital()).subscribe((data: Hospital) => {
      this.projet = data;
    });
  }
  /**
   *
   *Return liste Tech par hopital
   * @memberof InterventionsComponent
   */
  findTechByHospital() {
    console.log("findTechHospital")
    this.us.getUserTech().subscribe((data: User) => {
      console.log(data)
      this.techs = data;
    });
  }
  /**
   *
   *Return nom Tech
   * @memberof InterventionsComponent
   */

  findTechInList(listeTech, idTech) {
    console.log(listeTech, idTech);
    let index = _.findIndex(listeTech, function (t) {
      return t._id == idTech;
    });

    console.log(listeTech, index, idTech);
    return listeTech[index].fullName;
  }

  /**
   *
   *return departement d'une intervention
   * @param {Intervention} data
   * @returns {*}
   * @memberof InterventionsComponent
   */
  returnDepartement(data: Intervention): any {
    const found = this.departements.find(function (element) {
      if (element._id === data.idDepartement) {
        return element;
      }
    });
    return found;
  }

  returnCategorie(data) {
    const found = this.projet[0].metier.find(function (element) {
      if (typeof data == "string") {
        if (element._id === data) {
          return element;
        }
      } else {
        console.log(data);
      }
    });
    return found.name;
  }
  remplaceById(liste, obj) {
    let index = _.findIndex(liste, function (m) {
      return m._id == obj._id
    })
    liste.splice(index, 1, obj)
  }
}

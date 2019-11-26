import { Component, OnInit, ViewChild } from "@angular/core";
import { Hospital } from "../Class/Hospital";
import { HopitalService } from "../Service/hopital.service";
import { UserComponent } from "../user/user.component";
import { UserService } from "../Service/user.service";
import { User } from "../Class/user";
import { Metier } from "../Class/Metier";
import { MetierService } from "../Service/metier.service";
import { DepartementService } from "../Service/departement.service";
import Departement from "../Class/Departement";
import { HospitalComponent } from "./hospital/hospital.component";
import { FormHopitalComponent } from "./hospital/form-hopital/form-hopital.component";
import { MaintenanceService } from "../Service/maintenance.service";
import { Maintenance } from "../Class/Maintenance";
import { MaintenanceComponent } from "./maintenance/maintenance.component";

import * as _ from "lodash";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  @ViewChild(UserComponent)
  user: UserComponent;
  role: string;
  hoptial: Hospital;
  metiers: Metier;
  departements: Departement;
  flagAddListMetier: boolean;
  lastMetier: Hospital;
  @ViewChild(MaintenanceComponent)
  maintenanceComponent: MaintenanceComponent;
  @ViewChild(HospitalComponent)
  hospitalComponent: HospitalComponent;
  flagTosteAddHostpital: boolean;
  @ViewChild("element") element;
  public listeMaintenanceDefault: Maintenance;
  constructor(
    private ms: MetierService,
    private us: UserService,
    private hs: HopitalService,
    private ds: DepartementService,
    private MaintenanceService: MaintenanceService
  ) {}
  public headerText: Object = [
    { text: "Profils" },
    { text: "Hospital" },
    { text: "Maintenance" },
    { text: "Categories/Sub-Categories" },
    { text: "Assets" }
  ];
  public projet: any;

  ngOnInit() {
    this.AllToastFalse();
    this.role = this.us.getStatus();
    this.checkStatut(this.role);
    this.ds.getDepartements().subscribe((data: Departement) => {
      this.departements = data;
    });
    this.ms.getMetiers().subscribe((data: Metier) => {
      console.log(data);
      this.metiers = data;
    });
  }

  //#region Initialisation Function
  /**async checkStatut(statut)
   *
   * @param statut
   * Check Type Role
   * If role is notEqual superAdmin return Hospital by Id
   * else return allHospital
   *
   * @callback hs call ServiceHopital
   * @returns Hopital or hopital[]
   */
  checkStatut(statut) {
    if (statut !== "SuperAdmin") {
      this.getAllMaintenance();
      this.hs
        .findHopital(this.us.getIdHopital())
        .subscribe((data: Hospital) => {
          this.projet = data;
        });
    } else {
      this.getAllMaintenance();
      this.hs.getHospital().subscribe((data: Hospital[]) => {
        this.projet = data;
      });
    }
  }

  //#endregion

  //#region Hopital
  /**async addNewHopital($event)
   * addNewHostpial
   * @param $event
   */
  async addNewHopital($event) {
    try {
      this.projet.unshift(await this.hs.PostNewHospital($event));
      this.hospitalComponent.refreshGridListeHopital();
      this.showToast("addNewHopital");
      this.hospitalComponent.createFormHopital();
    } catch (error) {
      error.error[0] === "Duplicate" ? this.showToastError(error.error[0]) : "";
    }
  }

  addSubToHopital($event) {
    this.hs.addSubCatToHop($event).subscribe((data: Hospital) => {
     return data;
    });
  }
  rmDepToHopital($event) {
    console.log("rmdepartement:", $event);
    this.hs.delDepToHop($event).subscribe((data: Hospital) => {
      console.log(data);
    });
  }
  addDepToHopital($event) {
    console.log($event, 'Setting')
    this.hs.addDepToHop($event).subscribe((data: Hospital) => {
      console.log(data);
    });
  }
  //#endregion

  //#region User
  update($event) {
    this.us.postUser($event).subscribe((user: User) => {
      console.log(user);
    });
  }
  addDepartementUser($event) {
    this.us.addDepartement($event).subscribe((data: any) => {
      console.log(data);
    });
  }
  deparetmentUserRm($event) {
    this.us.remDepartement($event).subscribe((data: any) => {
      console.log(data);
    });
  }
  roleModif($event) {
    console.log($event);
    this.us.RoleModif($event).subscribe((data: any) => {
      console.log(data);
    });
  }
  //#endregion

  //#region Maintenance
  AddNewMaintenanceToHospital($event) {
    this.hs.AddMaintenanceToHosptial($event).subscribe((data: any) => {
      this.projet[0].maintenance.unshift(data);
      this.maintenanceComponent.refreshGrid();
    });
  }
  addNewMaintenance($event) {
    this.MaintenanceService.PostNewMaintenance($event).subscribe(
      (data: any) => {
        this.listeMaintenanceDefault = _.concat(
          data,
          this.listeMaintenanceDefault
        );
        console.log(this.listeMaintenanceDefault)
        this.maintenanceComponent.refreshGrid(this.listeMaintenanceDefault);
      }
    );
  }
  getAllMaintenance() {
    this.MaintenanceService.getMaintenance().subscribe((data: Maintenance) => {
      this.listeMaintenanceDefault = data;
    });
  }

  //#endregion

  //#region Metier
  /**addMetier($event)
   *
   * @param $event
   *
   * add a new Metier
   * and add new metier in listeMetier
   * @var lastMetier
   *
   */
  addMetier($event) {
    console.log($event);
    this.hs.addMetier($event).subscribe((data: Hospital) => {
      this.lastMetier = data;
    });
  }
  /**rmMetier($event)
   *
   * @param $event
   * remove metier
   */
  rmMetier($event) {
     this.hs.rmMetier($event).subscribe((data: Hospital) => {
      console.log(data);
    });
  }

  rmSubCat($event) {
    console.log($event)
    this.hs.rmSub($event).subscribe((data: Hospital) => {
      console.log(data);
    });
  }

  //#endregion

  //#region Toast
  showToast(toast: string) {
    console.log(toast);
    this.element.title = "<center>Success</center>";
    // this.element.animation.show.effect = 'FlipRightDownIn';
    if (toast == "addNewHopital") {
      this.element.content =
        "<div class='e-custom'><center>New hospital add</center></div>";
    }

    this.element.cssClass = "e-toast-success";
    this.element.show({ timeOut: 4000 });
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
  AllToastFalse() {
    this.flagAddListMetier = false;
    this.flagTosteAddHostpital = false;
  }
  //#endregion
}

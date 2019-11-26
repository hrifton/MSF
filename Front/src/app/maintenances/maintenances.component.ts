//#region Import
import { DateMaintenanceService } from "./../Service/dateMaintenance.service";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MaintenanceService } from "../Service/maintenance.service";
import { Maintenance } from "../Class/Maintenance";
import { DateMaintenance } from "../Class/DateMaintenance";
import { CalendrierComponent } from "./calendrier/calendrier.component";
import { UserService } from "../Service/user.service";
import { HopitalService } from "../Service/hopital.service";
import { Hospital } from "../Class/Hospital";
//#endregion

@Component({
  selector: "app-maintenances",
  templateUrl: "./maintenances.component.html"
  // styleUrls: ['./maintenances.component.css']
})
export class MaintenancesComponent implements OnInit {
  maintenance: Maintenance[];
  datemaitenance: DateMaintenance[];
  public lrepeat: { [key: string]: Object }[] = [
    { repeat: "Never" },
    { repeat: "Daily" },
    { repeat: "Weekly" },
    { repeat: "Monthly" },
    { repeat: "Yearly" }
  ];
  public lEnd: { [key: string]: Object }[] = [
    { end: "Never" },
    { end: "Until" },
    { end: "Count" }
  ];

  @ViewChild(CalendrierComponent)
  calendrier: CalendrierComponent;
  projet: Hospital;
  techs: any[];
  /**
   * @param ms
   * @param dms
   * recuperation des datas "date de maintenance" et "maintenance"
   */
  constructor(
    private ms: MaintenanceService,
    private dms: DateMaintenanceService,
    private us: UserService,
    private hs: HopitalService
  ) {
    //initialiation variable
    this.techs=[]
    this.maintenance = [];
    this.datemaitenance = [];
    // recuperation date de maintenance
    if (this.us.getStatus() == "Admin" || this.us.getStatus() == "Operator") {
      this.hs
        .findHopital(this.us.getIdHopital())
        .subscribe((data: Hospital) => {
          this.projet = data;
          this.maintenance = this.projet[0].maintenance;
        });
        this.us.getUserTech().subscribe((data: any) => {
          this.techs = data;
          console.log(this.techs)
        });
    }// recuperation des maintenance planifiable
    this.dms.getDateMaintenance().subscribe((data: DateMaintenance[]) => {
      this.datemaitenance = data;
    });
    
  
  }
  // TODO Hicham multi requet
  saveMaintenance($event) {
    console.log($event);
    this.dms.postDateMaintenance($event);
    console.log(this.datemaitenance);
    this.datemaitenance.push($event);
    this.calendrier.refreshAgenda();
  }

  deleteMaintenance($event) {
    //assignation des date de mainteannce modifier depuis component enfant
    this.datemaitenance = $event;
    // fonction du component enfant pour refresh le calendrier
    this.calendrier.refreshAgenda();
  }
  ngOnInit() {}
}

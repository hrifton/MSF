//#region Import
import { DateMaintenanceService } from "./../Service/dateMaintenance.service";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MaintenanceService } from "../Service/maintenance.service";
import { Maintenance } from "../Class/Maintenance";
import { DateMaintenance } from "../Class/DateMaintenance";
import { CalendrierComponent } from "./calendrier/calendrier.component";
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
  /**
   * @param ms
   * @param dms
   * recuperation des datas "date de maintenance" et "maintenance"
   */
  constructor(
    private ms: MaintenanceService,
    private dms: DateMaintenanceService
  ) {
    //initialiation variable
    this.maintenance = [];
    this.datemaitenance = [];
    // recuperation date de maintenance
    this.dms.getDateMaintenance().subscribe((data: DateMaintenance[]) => {
      this.datemaitenance = data;
    });
    // recuperation des maintenance planifiable
    this.ms.getMaintenance().subscribe((data: Maintenance[]) => {
      this.maintenance = data;
    });
  }
  // TODO Hicham multi requet
  saveMaintenance($event) {
    this.dms.postDateMaintenance($event);
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

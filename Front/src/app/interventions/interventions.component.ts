import { UserService } from "../Service/user.service";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule
} from "@angular/common/http";
import Intervention from "src/app/intervention/Intervention";
import { InterventionService } from "./../Service/intervention.service";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { User } from "../Class/user.model";
import { Ng6OdooRPCService } from "angular6-odoo-jsonrpc";
import { ListInterventionComponent } from "./list-intervention/list-intervention.component";
import { HistoricInterventionComponent } from "./historic-intervention/historic-intervention.component";

@Component({
  selector: "app-interventions",
  templateUrl: "./interventions.component.html",
  // styleUrls: ['./interventions.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [Ng6OdooRPCService]
})
export class InterventionsComponent implements OnInit {
  public interventions: Intervention[];
  userDetails;
  techs: User[];

  @ViewChild(ListInterventionComponent)
  interentionList: ListInterventionComponent;
  @ViewChild(HistoricInterventionComponent)
  HistoricIntervention: HistoricInterventionComponent;

  constructor(
    private is: InterventionService,
    private us: UserService,
    private odooRPC: Ng6OdooRPCService
  ) {
    this.interventions = [];
    console.log("compoment parent: Constructor");
  }

  update($event) {
    this.interventions.unshift($event);
    this.interentionList.refreshInterventionTable();
    this.HistoricIntervention.refreshChart();
  }
  check($event){
    console.log("inter closed :",$event)
  }

  ngOnInit() {
    this.us.getUserProfil().subscribe(
      res => {
        this.userDetails = res["user"];

        //gestion Du type d'utilisateur
        // tslint:disable-next-line:triple-equals
        if (this.userDetails.status == "user") {
          this.is
            .getInterventionsByUser(this.userDetails.fullName)
            .subscribe((data: Intervention[]) => {
              this.interventions = data;
            });
        }
        // tslint:disable-next-line:triple-equals
        else if (this.userDetails.status == "tech") {
          this.is
            .getInterventionsBytech(this.userDetails.fullName)
            .subscribe((data: Intervention[]) => {
              this.interventions = data;
            });
        } else {
          this.is.getInterventions().subscribe((data: Intervention[]) => {
            this.interventions = data;
          });
        }
      },
      err => {}
    );
    this.us.getUserTech().subscribe((data: User[]) => {
      this.techs = data;
    });
    /*
    // https://trackmystuff-dev.ocb.msf.org/web
    this.odooRPC.init({
      odoo_server: "https://trackmystuff-dev.ocb.msf.org", // 'http://trackmystuff-dev.ocb.msf.org',
      http_auth: "HQ@brussels.msf.org:TMS123" // optional
    });

    this.odooRPC
      .login("MSF", "HQ@brussels.msf.org", "TMS123")
      .then(res => {
        console.log("login success");
      })
      .catch(err => {
        console.error("login failed", err);
      });
  }*/
  }
}

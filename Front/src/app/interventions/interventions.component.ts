import { UserService } from '../Service/user.service';
// tslint:disable-next-line: import-spacing
import{ AnalyseMixIntermaintComponent } from '../analyse-mix-intermaint/analyse-mix-inter-maint.component';

import { InterventionService } from './../Service/intervention.service';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { User } from '../Class/user.model';
import { Ng6OdooRPCService } from 'angular6-odoo-jsonrpc';
import { ListInterventionComponent } from './list-intervention/list-intervention.component';

import Intervention from '../Class/Intervention';
import { DateMaintenanceService } from '../Service/dateMaintenance.service';
import * as moment from 'moment';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  // styleUrls: ['./interventions.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [Ng6OdooRPCService]
})
export class InterventionsComponent implements OnInit {
  public interventions: Intervention[];
  public maintenance: any[];
  userDetails;
  techs: User[];

  @ViewChild(ListInterventionComponent)
  interentionList: ListInterventionComponent;

  @ViewChild(AnalyseMixIntermaintComponent)
  AnalyseMixIntermaint: AnalyseMixIntermaintComponent;
  
  constructor(
    private is: InterventionService,
    private us: UserService,
    private ds: DateMaintenanceService,
    private odooRPC: Ng6OdooRPCService
  ) {
    this.interventions = [];
    this.maintenance = [];
    console.log('compoment parent: Constructor');
  }

  update($event) {
    this.interventions.unshift($event);
    this.interentionList.refreshInterventionTable();
    //this.HistoricIntervention.refreshChart();
  }
  check($event) {
    console.log('inter closed :', $event);
  }

  ngOnInit() {
    this.us.getUserProfil().subscribe(
      res => {
        this.userDetails = res['user'];

        // gestion Du type d'utilisateur

        if (this.userDetails.status === 'user') {
          this.is
            .getInterventionsByUser(this.userDetails.fullName)
            .subscribe((data: Intervention[]) => {
              this.interventions = data;
            });
        } else if (this.userDetails.status === 'tech') {
          this.is
            .getInterventionsBytech(this.userDetails.fullName)
            .subscribe((data: Intervention[]) => {
              this.interventions = data;
            });
        } else {
          this.is.getInterventions().subscribe((data: any[]) => {
            this.ds.getMaintenanceAndIntervention().subscribe((maindata: any[]) => {
            
            maindata.forEach(element => {
              const inter = {
                _id: element.idMaintenance,
                day: moment(element.StartTime).format("DD/MM/YYYY"),
                departement: element.resultat[0].executor,
                description: element.resultat[0].description,
                locality: '',
                priority: 'Medium',
                status: 'In process',
                tech: "",
                type: 'Maintenance',
                user: '',
              };
              data.push(inter);
            });
this.interventions=data
this.interventions.sort((a,b) => (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0));

          });
          });
         
        }
      },
      err => { }
    );
    this.us.getUserTech().subscribe((data: User[]) => {
      this.techs = data;
    });
  }

  
}

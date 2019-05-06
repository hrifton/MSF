import { DateMaintenanceService } from './../Service/dateMaintenance.service';
import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MaintenanceService } from '../Service/maintenance.service';
import { Maintenance } from '../Class/Maintenance';
import Intervention from '../intervention/Intervention';
import { DateMaintenance } from '../Class/DateMaintenance';

import * as moment from 'moment';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html'
  // styleUrls: ['./maintenances.component.css']
})
export class MaintenancesComponent implements OnInit {
  maintenance: any;
  datemaitenance: DateMaintenance[];

  constructor(
    private ms: MaintenanceService,
    private dms: DateMaintenanceService
  ) {
    this.maintenance = [];
    this.datemaitenance = [];
    this.dms.getDateMaintenance().subscribe((data: DateMaintenance[]) => {

      this.datemaitenance = data;
      console.log(this.datemaitenance);
    });

    console.log('compoment parent: Constructor');
  }

  saveMaintenance(maintenance) {
    // TODO: Verifier si Hour ou Min Regex

    maintenance.value.StartTime = moment(maintenance.value.date).format('L LT');

    maintenance.value.EndTime = moment(maintenance.value.date).add(2, 'hours').format('L LT');


    // this.dms.postDateMaintenance(maintenance.value);
  }
  ngOnInit() {
    this.ms.getMaintenance().subscribe((data: Maintenance[]) => {
      this.maintenance = data;
    });


    console.log('compoment parent  : OnInit');
    console.log(this.maintenance);
  }
}

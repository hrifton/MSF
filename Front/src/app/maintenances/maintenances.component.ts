import { DateMaintenanceService } from './../Service/dateMaintenance.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MaintenanceService } from '../Service/maintenance.service';
import { Maintenance } from '../Class/Maintenance';

import { DateMaintenance } from '../Class/DateMaintenance';

import * as moment from 'moment';
import { CalendrierComponent } from './calendrier/calendrier.component';


@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html'
  // styleUrls: ['./maintenances.component.css']
})
export class MaintenancesComponent implements OnInit {
  maintenance: any;
  datemaitenance: DateMaintenance[];
  public lrepeat: { [key: string]: Object }[] = [
    { repeat: 'Never' },
    { repeat: 'Daily' },
    { repeat: 'Weekly' },
    { repeat: 'Monthly' },
    { repeat: 'Yearly' },

  ];

  public lEnd: { [key: string]: Object }[] = [
    { end: 'Never' },
    { end: 'Until' },
    { end: 'Count' },


  ];

  @ViewChild(CalendrierComponent)
  calendrier: CalendrierComponent;

  constructor(
    private ms: MaintenanceService,
    private dms: DateMaintenanceService
  ) {
    this.maintenance = [];
    this.datemaitenance = [];

    this.dms.getDateMaintenance().subscribe((data: DateMaintenance[]) => {
      this.datemaitenance = data;
    });

    this.ms.getMaintenance().subscribe((data: Maintenance[]) => {
      this.maintenance = data;
    });

    console.log('compoment parent: Constructor');
  }

  saveMaintenance($event) {

    $event.forEach(element => {
      this.dms.postDateMaintenance(element);
      element.CategoryColor='#7fa900',
      this.datemaitenance.push(element);
    });
    this.calendrier.refreshAgenda();
  }

  deleteMaintenance($event){
   console.log(this.dms.deleteDateMaintenance($event))

   
    this.datemaitenance.forEach(element => {
     //console.log(element)
    });
  }
  ngOnInit() {

  }
}

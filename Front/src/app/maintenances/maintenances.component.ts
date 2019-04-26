
import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MaintenanceService } from '../Service/maintenance.service';
import { Maintenance } from '../Class/Maintenance';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html',
  //styleUrls: ['./maintenances.component.css']
})
export class MaintenancesComponent implements OnInit {
  maintenance:any;

  constructor(private ms: MaintenanceService) {


  }


ngOnInit(){




}



  }




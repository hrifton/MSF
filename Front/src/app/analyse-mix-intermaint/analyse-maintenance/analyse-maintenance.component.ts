import { Component, OnInit,Input, SimpleChanges } from '@angular/core';



@Component({
  selector: 'app-analyse-maintenance',
  templateUrl: './analyse-maintenance.component.html',
  styleUrls: ['./analyse-maintenance.component.scss']
})
export class AnalyseMaintenanceComponent implements OnInit {
  
  @Input() analyseMaintenance;
  constructor() { 
    this.analyseMaintenance=[]
    console.log(this.analyseMaintenance)
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes)
  }
}
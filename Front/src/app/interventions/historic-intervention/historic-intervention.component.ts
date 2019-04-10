//import { Component, OnInit, ViewChild } from '@angular/core';
//import { AccumulationChartComponent, AccumulationChart, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-historic-intervention',
  templateUrl: './historic-intervention.component.html',
  styleUrls: ['./historic-intervention.component.scss']
})
export class HistoricInterventionComponent implements OnInit {


    public piedata: Object[];
    public legendSettings: Object;
    public map: Object = 'fill';
    public datalabel: Object;



    ngOnInit(): void {
      this.piedata = [
                { x: 'Jan', y: 25, text: 'Open',fill:'#b03841' }, { x: 'Feb', y: 75, text: 'Closed',fill:'#f95e5e'}
               ];

      this.datalabel = { visible: true, name: 'text', position: 'Outside' };

      this.legendSettings = {
            visible: true
        };
    }
}


import { Component, ViewChild, ViewEncapsulation, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-historic-intervention',
  templateUrl: './historic-intervention.component.html',
  styleUrls: ['./historic-intervention.component.scss']
})
export class HistoricInterventionComponent implements OnInit {

  @Input()interventions;

    public status = {open: 0, close: 0};
    public piedata: Object[];
    public legendSettings: Object;
    public map: Object = 'fill';
    public datalabel: Object;
    public open: number;
    public close: number;



   /* ngOnChanges(changes: any): void {
      var sizeOpenChange=changes.sizeOpen.currentValue;
      if(sizeOpenChange){
       console.log(changes.sizeOpen.currentValue)
      }

    }*/

    ngOnInit(): void {


    }

    getNumberOpenClose(data) {

     let open = 0;
     let close = 0;
     this.interventions.forEach(element => {
          if (element.status === 'en_cours') {
            open++;
          } else {
            close++;
          }
        });
     this.status.open = open;
     this.status.close = close;
     this.getChart(this.status);
    }

    ngOnChanges(changes: any) {
       if (typeof this.interventions !== 'undefined') {
         console.log('changement')
       this.getNumberOpenClose(this.interventions);
       }
      }



getChart(data) {

this.piedata = [
    { x: 'Open :'+data.open, y: Math.round((data.open*100)/(data.open+data.close)), text: 'open :'+data.open, fill: '#FFB18F' }, { x: 'Closed : '+data.close, y: Math.round((data.close*100)/(data.open+data.close)), text: 'closed', fill: '#9C0908'}
   ];

this.datalabel = { visible: true, name: 'text', position: 'Outside' };

this.legendSettings = {
visible: true
};
}
 @ViewChild('pie')

      // custom code end
    public center: Object = {x: '50%', y: '50%'};
    public startAngle: number = 0;
    public endAngle: number = 360;
    public explode: boolean = true;
    public enableAnimation: boolean = false;
    public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y}%</b>' };
    public title: string = 'Analyse JobRequest';
    constructor(private cd:ChangeDetectorRef) {
        //code
    };
}

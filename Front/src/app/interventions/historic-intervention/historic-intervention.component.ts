
import { Component, ViewChild, ViewEncapsulation, OnInit, Input, SimpleChanges } from '@angular/core';
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
       this.getNumberOpenClose(this.interventions);
       }
      }



getChart(data) {

this.piedata = [
    { x: 'Open', y: data.open, text: 'open :'+data.open, fill: '#FFB18F' }, { x: 'Closed', y: data.close, text: 'closed:'+data.close, fill: '#9C0908'}
   ];

this.datalabel = { visible: true, name: 'text', position: 'Outside' };

this.legendSettings = {
visible: true
};
}
}

import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ChartComponent, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-analyse-intervention',
  templateUrl: './analyse-intervention.component.html',
  styleUrls: ['./analyse-intervention.component.scss']
})
export class AnalyseInterventionComponent implements OnInit {


  @Input() analyseIntervention;
  constructor() {
    this.analyseIntervention = [];

  }
  @ViewChild('chart') public chart: ChartComponent;
  public status = { open: 0, close: 0, canceled: 0, waiting: 0 };
  // tslint:disable-next-line: ban-types
  private piedata: Object[];
  public legendSettings: Object;
  public map: Object = 'fill';
  public datalabel: Object;
  public open: number;
  public close: number;


  ngOnInit() {
  }
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark') as AccumulationTheme;
  }
  ngOnChanges(changes: SimpleChanges): void {

   this.getNumberOpenClose(changes.analyseIntervention.currentValue);
   this.analyseIntervention = changes.analyseIntervention.currentValue;
  }

 public refreshChart() {
   
   this.getNumberOpenClose(this.analyseIntervention);
   this.chart.refresh();
   console.log("refresh internvention")
  }

  getNumberOpenClose(data) {

    let open = 0;
    let canceled = 0;
    let close = 0;
    let waiting = 0;
    data.forEach(element => {
      switch (element.status) {
        case 'In progress':
          open++;
          break;
        case 'Closed':
          close++;
          break;
        case 'Canceled':
          canceled++;
          break;
        case 'In progress':
          open++;
          break;

        default:
          waiting++;
          break;
      }

    });
    this.status.open = open;
    this.status.close = close;
    this.status.canceled = canceled;
    this.status.waiting = waiting;

    this.getChart(this.status);
  }
  getChart(data) {

    this.piedata = [
      // tslint:disable-next-line:max-line-length
      {
        x: 'Closed : ' + data.close,
        y: Math.round((data.close * 100) / (data.open + data.close + data.waiting + data.canceled)),
        text: 'closed',
        fill: '#d9480f'
      },
      {
        x: 'Open :' + data.open,
        y: Math.round((data.open * 100) / (data.open + data.close + data.waiting + data.canceled)),
        text: 'open :' + data.open,
        fill: '#51cf66'
      },
      {
        x: 'Waiting :' + data.waiting,
        y: Math.round((data.waiting * 100) / (data.open + data.close + data.waiting + data.canceled)),
        text: 'waiting :' + data.waiting,
        fill: '#fab005'
      },
      {
        x: 'Canceled :' + data.canceled,
        y: Math.round((data.canceled * 100) / (data.open + data.close + data.waiting + data.canceled)),
        text: 'canceled :' + data.canceled,
        fill: '#ffd8a8'
      },

    ];

    this.datalabel = { visible: true, name: 'text', position: 'Outside' };

    this.legendSettings = {
      visible: true
    };

  }
  @ViewChild('pie') public pie: ChartComponent;

  // custom code end
  public center: Object = { x: '50%', y: '50%' };
  public startAngle = 0;
  public endAngle = 360;
  public explode = true;
  public enableAnimation = false;
  public tooltip: Object = {
    enable: true,
    format: '${point.x} : <b>${point.y}%</b>'
  };
}

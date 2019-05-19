import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  Input,
  SimpleChanges,
  ChangeDetectorRef
} from "@angular/core";
import {
  AccumulationChart,
  AccumulationChartComponent,
  IAccLoadedEventArgs,
  AccumulationTheme,
  ChartComponent
} from "@syncfusion/ej2-angular-charts";
import { GridComponent } from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-historic-intervention",
  templateUrl: "./historic-intervention.component.html",
  styleUrls: ["./historic-intervention.component.scss"]
})
export class HistoricInterventionComponent implements OnInit {
  @Input() interventions;
  @Input() maintenance;
  @ViewChild("chart") public chart: ChartComponent;
  public status = { open: 0, close: 0, canceled: 0, waiting: 0 };
  public piedata: Object[];
  public legendSettings: Object;
  public map: Object = "fill";
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
    this.getNumberOpenClose(this.interventions);
  }

  refreshChart() {
    this.getNumberOpenClose(this.interventions);
    this.chart.refresh();
  }
  getNumberOpenClose(data) {
   console.log(this.maintenance)
   console.log(this.interventions)
    let open = 0;
    let canceled = 0;
    let close = 0;
    let waiting = 0;
    data.forEach(element => {
      switch (element.status) {
        case "In progress":
          open++;
          break;
        case "Closed":
          close++;
          break;
        case "Canceled":
          canceled++;
          break;
        case "In progress":
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
        x: "Open :" + data.open,
        y: Math.round((data.open * 100) / (data.open + data.close + data.waiting + data.canceled)),
        text: "open :" + data.open,
        fill: "#51cf66"
      },
      {
        x: "Waiting :" + data.waiting,
        y: Math.round((data.waiting * 100) / (data.open + data.close + data.waiting + data.canceled)),
        text: "waiting :" + data.waiting,
        fill: "#fab005"
      },
      {
        x: "Canceled :" + data.canceled,
        y: Math.round((data.canceled * 100) / (data.open + data.close + data.waiting + data.canceled)),
        text: "canceled :" + data.canceled,
        fill: "#ffd8a8"
      },
      {
        x: "Closed : " + data.close,
        y: Math.round((data.close * 100) / (data.open + data.close)),
        text: "closed",
        fill: "#d9480f"
      }
    ];

    this.datalabel = { visible: true, name: "text", position: "Outside" };

    this.legendSettings = {
      visible: true
    };
  }
  @ViewChild("pie") public pie: ChartComponent;

  // custom code end
  public center: Object = { x: "50%", y: "50%" };
  public startAngle = 0;
  public endAngle = 360;
  public explode = true;
  public enableAnimation = false;
  public tooltip: Object = {
    enable: true,
    format: "${point.x} : <b>${point.y}%</b>"
  };
  //public title: string = "Analyse JobRequest";
  constructor(private cd: ChangeDetectorRef) {
    //code
  }
}

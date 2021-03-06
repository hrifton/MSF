import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {
  IAccLoadedEventArgs,
  AccumulationTheme,
  ChartComponent
} from "@syncfusion/ej2-angular-charts";
import { TabComponent } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-analyse-maintenance",
  templateUrl: "./analyse-maintenance.component.html",
  styleUrls: ["./analyse-maintenance.component.scss"]
})
export class AnalyseMaintenanceComponent implements OnInit {
  constructor() {
    this.analyseMaintenance = [];
  }

  @Input() analyseMaintenance;
  @ViewChild("chart") public chart: ChartComponent;
  public status = { open: 0, done: 0, canceled: 0, waiting: 0 };
  public title: string;
  // tslint:disable-next-line: ban-types
  public piedata: Object[];
  public legendSettings: Object;
  public map: Object = "fill";
  public datalabel: Object;
  public open: number;
  public done: number;
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

  ngOnInit() {
    this.getChart(this.analyseMaintenance);
  }
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark") as AccumulationTheme;
  }
  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes)

  }

  getChart(data) {
    this.piedata = [
      // tslint:disable-next-line:max-line-length
      {
        x: 'Done : ' + data.done,
        y: Math.round(
          (data.done * 100) /
          (data.new + data.open + data.done + data.waiting + data.canceled)
        ),
        text: 'Done',
        fill: '#5c940d'
      },
      {
        x: 'Open :' + data.open,
        y: Math.round(
          (data.open * 100) /
          (data.new + data.open + data.done + data.waiting + data.canceled)
        ),
        text: 'open :' + data.open,
        fill: '#c0eb75'
      },
      {
        x: 'Waiting :' + data.waiting,
        y: Math.round(
          (data.waiting * 100) /
          (data.new + data.open + data.done + data.waiting + data.canceled)
        ),
        text: 'waiting :' + data.waiting,
        fill: '#94d82d'
      },
      {
        x: 'New :' + data.new,
        y: Math.round(
          (data.new * 100) /
          (data.new + data.open + data.done + data.waiting + data.canceled)
        ),
        text: 'new :' + data.new,
        fill: '#E3E3E2'
      },
      {
        x: 'Canceled :' + data.canceled,
        y: Math.round(
          (data.canceled * 100) /
          (data.new + data.open + data.done + data.waiting + data.canceled)
        ),
        text: 'canceled :' + data.canceled,
        fill: '#fa5252'
      }
    ];

    this.datalabel = { visible: true, name: 'text', position: 'Outside' };

    this.legendSettings = {
      visible: true
    };
    // this.show = true
  }
}

import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import {
  ChartComponent,
  IAccLoadedEventArgs,
  AccumulationTheme
} from "@syncfusion/ej2-angular-charts";

@Component({
  selector: "app-analyse-intervention",
  templateUrl: "./analyse-intervention.component.html",
  styleUrls: ["./analyse-intervention.component.scss"]
})
export class AnalyseInterventionComponent implements OnInit {
  @Input() analyseIntervention;
  constructor() { }
  @ViewChild("chart") public chart: ChartComponent;
  public status = { open: 0, done: 0, canceled: 0, waiting: 0 };
  // tslint:disable-next-line: ban-types
  public piedata: Object[];
  public title: string;

  public legendSettings: Object;
  public map: Object = "fill";
  public datalabel: Object;
  public open: number;
  public done: number;

  ngOnInit() {
    this.getChart(this.analyseIntervention);
  }
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark") as AccumulationTheme;
  }

  getChart(data) {
    console.log(data)
    this.piedata = [

      {
        x: "Done : " + data.done,
        y: Math.round(
          (data.done * 100) /
          (data.open + data.done + data.waiting + data.canceled)
        ),
        text: "Done",
        fill: "#3da11e69"
      },
      {
        x: "Open :" + data.open,
        y: Math.round(
          (data.open * 100) /
          (data.open + data.done + data.waiting + data.canceled)
        ),
        text: "Open :" + data.open,
        fill: "#fd242463"
      },
      {
        x: "Waiting :" + data.waiting,
        y: Math.round(
          (data.waiting * 100) /
          (data.open + data.done + data.waiting + data.canceled)
        ),
        text: "waiting :" + data.waiting,
        fill: "#af941c69"
      },
      {
        x: "Canceled :" + data.canceled,
        y: Math.round(
          (data.canceled * 100) /
          (data.open + data.done + data.waiting + data.canceled)
        ),
        text: "canceled :" + data.canceled,
        fill: "#ffd8a8"
      }
    ];

    this.datalabel = { visible: true, name: "text", position: "Outside" };

    this.legendSettings = {
      visible: true
    };
    this.chart.refresh();
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
}

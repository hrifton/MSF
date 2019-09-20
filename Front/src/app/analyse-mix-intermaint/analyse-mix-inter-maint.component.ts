import {
  Component,
  ViewChild,
  OnInit,
  Input,
  ChangeDetectorRef
} from "@angular/core";

import {
  ChartComponent,
  IAccLoadedEventArgs,
  AccumulationTheme
} from "@syncfusion/ej2-angular-charts";
import {
  TabComponent,
  SelectEventArgs
} from "@syncfusion/ej2-angular-navigations";
import { AnalyseInterventionComponent } from "./analyse-intervention/analyse-intervention.component";
import { AnalyseMaintenanceComponent } from "./analyse-maintenance/analyse-maintenance.component";

@Component({
  selector: "app-analyse-mix-intermaint",
  templateUrl: "./analyse-mix-intermaint.component.html",
  styleUrls: ["./analyse-mix-intermaint.component.scss"]
})
export class AnalyseMixIntermaintComponent implements OnInit {
  // public title: string = "Analyse JobRequest";
  constructor(private cd: ChangeDetectorRef) {
    // code
  }

  public maintenance: Object[];
  public analyseIntervention: Object[];
  public analyseMaintenance: Object[];
  @Input() interventions;

  @ViewChild(AnalyseInterventionComponent)
  AnalyseIntervention: AnalyseInterventionComponent;
  @ViewChild(AnalyseMaintenanceComponent)
  AnalyseMaintenance: AnalyseMaintenanceComponent;
  @ViewChild("chart") public chart: ChartComponent;
  private status = { open: 0, close: 0, canceled: 0, waiting: 0 };
  // tslint:disable-next-line: ban-types
  private piedata: Object[];
  legendSettings: Object;
  private map: Object = "fill";
  private datalabel: Object;
  private open: number;
  private close: number;
  @ViewChild("element") tabObj: TabComponent;
  public headerText: Object = [
    { text: "Inter./Maint." },
    { text: "Intervention" },
    { text: "Maintenance" }
  ];
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

  /**
   *
   * @param e value de l'onglet
   * refesh le chart
   */
  public tabSelected(e: SelectEventArgs): void {
    switch (e.selectedItem.innerText) {
      case "INTER./MAINT.":
        this.refreshChart();
        break;

      case "MAINTENANCE":
        this.AnalyseMaintenance.getNumberOpenClose(this.analyseMaintenance);
        this.AnalyseMaintenance.refreshChart();
        break;

      case "INTERVENTION":
        this.AnalyseIntervention.getNumberOpenClose(this.analyseIntervention);
        this.AnalyseIntervention.refreshChart();
        break;
    }
  }

  ngOnChanges(ChangeEventArgs: any): void {
    //verifie si le tableau d'interventions a changer
    if (!ChangeEventArgs.interventions.firstChange) {
      this.refreshChart();
    }
  }

  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark") as AccumulationTheme;
  }

  ngOnInit(): void {
    this.analyseIntervention = [];
    this.analyseMaintenance = [];
    this.getNumberOpenClose(this.interventions);
    this.checkMaintInter(this.interventions);
  }

  refreshChart() {
    this.getNumberOpenClose(this.interventions);
    this.chart.refresh();
    this.AnalyseIntervention.refreshChart();
    this.AnalyseMaintenance.refreshChart();
  }
  checkMaintInter(data) {
    data.forEach(element => {
      if (element.type === "Maintenance") {
        this.analyseMaintenance.push(element);
      } else {
        this.analyseIntervention.push(element);
      }
    });
  }
  getNumberOpenClose(data) {
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
  getNumberOpenCloseMaintenance(data) {
    console.log(data);
  }

  getChart(data) {
    this.piedata = [
      // tslint:disable-next-line:max-line-length
      {
        x: "Closed : " + data.close,
        y: Math.round(
          (data.close * 100) /
            (data.open + data.close + data.waiting + data.canceled)
        ),
        text: "closed",
        fill: "#d9480f"
      },
      {
        x: "Open :" + data.open,
        y: Math.round(
          (data.open * 100) /
            (data.open + data.close + data.waiting + data.canceled)
        ),
        text: "open :" + data.open,
        fill: "#51cf66"
      },
      {
        x: "Waiting :" + data.waiting,
        y: Math.round(
          (data.waiting * 100) /
            (data.open + data.close + data.waiting + data.canceled)
        ),
        text: "waiting :" + data.waiting,
        fill: "#fab005"
      },
      {
        x: "Canceled :" + data.canceled,
        y: Math.round(
          (data.canceled * 100) /
            (data.open + data.close + data.waiting + data.canceled)
        ),
        text: "canceled :" + data.canceled,
        fill: "#ffd8a8"
      }
    ];

    this.datalabel = { visible: true, name: "text", position: "Outside" };

    this.legendSettings = {
      visible: true
    };
  }
}

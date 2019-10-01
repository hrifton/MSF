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
  statusInt: { open: number; canceled: number; close: number; waiting: number };
  statusMaint: {
    open: number;
    canceled: number;
    close: number;
    waiting: number;
  };
  // public title: string = "Analyse JobRequest";
  constructor(private cd: ChangeDetectorRef) {
    // code
  }

  public maintenance: Object[];
  public analyseIntervention = [];
  public analyseMaintenance = [];
  @Input() interventions;
  @Input() user;

  @ViewChild(AnalyseInterventionComponent)
  AnalyseIntervention: AnalyseInterventionComponent;
  @ViewChild(AnalyseMaintenanceComponent)
  AnalyseMaintenance: AnalyseMaintenanceComponent;
  @ViewChild("chart") public chart: ChartComponent;
  // tslint:disable-next-line: ban-types
  private piedata: Object[];
  legendSettings: Object;
  private map: Object = "fill";
  private datalabel: Object;
  private open: number;
  private close: number;
  @ViewChild("element") tabObj: TabComponent;
  public headerText: Object = [];
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
        this.AnalyseMaintenance.getChart(
          this.getNumberOpenClose(this.analyseMaintenance)
        );
        break;

      case "INTERVENTION":
        this.AnalyseIntervention.getChart(
          this.getNumberOpenClose(this.analyseIntervention)
        );
        break;
    }
  }

  ngOnChanges(ChangeEventArgs: any): void {
    //verifie si le tableau d'interventions a changer
    if (!ChangeEventArgs.interventions.firstChange) {
      this.refreshChart();
      this.AnalyseIntervention.getChart(
        this.getNumberOpenClose(this.analyseIntervention)
      );
      this.AnalyseMaintenance.getChart(
        this.getNumberOpenClose(this.analyseMaintenance)
      );
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
    if(this.user !='User'){
      this.headerText= [
    { text: "Inter./Maint." },
    { text: "Intervention" },
    { text: "Maintenance" }
  ];
    }else{
 this.headerText = [ 
   { text: "Intervention" }
 ];
    }
    this.checkMaintInter(this.interventions);
    let statusIntMaint;
    let statusInt;
    let statusMaint;

    statusIntMaint = this.getNumberOpenClose(this.interventions);
    this.statusInt = this.getNumberOpenClose(this.analyseIntervention);
    this.statusMaint = this.getNumberOpenClose(this.analyseMaintenance);
    this.getChart(statusIntMaint);
    //this.AnalyseIntervention.refreshChart(this.statusInt);
    //this.AnalyseMaintenance.getChart(this.statusMaint);
  }

  refreshChart() {
    let obj = this.getNumberOpenClose(this.interventions);
    this.getChart(obj);

    this.chart.refresh();

    this.checkMaintInter(this.interventions);
  }
  checkMaintInter(data) {
    this.analyseMaintenance = [];
    this.analyseIntervention = [];
    data.forEach(element => {
      if (element.type === "Maintenance") {
        console.log(element.type);
        this.analyseMaintenance.push(element);
      } else {
        console.log(element.type);
        this.analyseIntervention.push(element);
      }
    });
  }
  getNumberOpenClose(data) {
    const obj = {
      open: 0,
      canceled: 0,
      close: 0,
      waiting: 0
    };

    data.forEach(element => {
      switch (element.status) {
        case "In progress":
          obj.open++;
          break;
        case "Closed":
          obj.close++;
          break;
        case "Canceled":
          obj.canceled++;
          break;
        case "In progress":
          obj.open++;
          break;

        default:
          obj.waiting++;
          break;
      }
    });

    return obj;
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

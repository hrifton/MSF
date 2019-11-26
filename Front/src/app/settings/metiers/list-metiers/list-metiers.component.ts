import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { Metier } from "src/app/Class/Metier";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import {
  GridComponent,
  ToolbarItems,
  EditSettingsModel,
  SelectionSettingsModel,
  RowDataBoundEventArgs
} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-list-metiers",
  templateUrl: "./list-metiers.component.html",
  styleUrls: ["./list-metiers.component.scss"]
})
export class ListMetiersComponent implements OnInit {
  @Input() metiers: Metier[];
  @Input() itemToolBar: any;
  @Output() messageEvent = new EventEmitter<Metier>();
  @Output() deleteMetier = new EventEmitter<Metier>();
  selection: any;
  constructor() {}
  @ViewChild("grid")
  public grid: GridComponent;
  public data: any;
  public pageSettings: Object;
  public filterSettings: Object;
  public toolbarItems: ToolbarItems[];
  public editOptions: EditSettingsModel;

  public orderidrules: Object;

  show: boolean;

  ngOnInit() {
    console.log(this.metiers);
    this.data = this.metiers;
    this.pageSettings = { pageCount: 5 };
    this.filterSettings = { type: "Menu" };
    this.toolbarItems = ["Delete"];
    this.editOptions = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Normal"
    };
    this.orderidrules = { required: true };
  }

  rowSelected($event) {
    this.selection = $event.data;
    this.messageEvent.emit($event.data);
  }

  refresh() {
    console.log("refresh Liste Metier");
    this.grid.refresh();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.metiers.currentValue);
    if (changes.metiers.currentValue) {
      this.data = changes.metiers.currentValue;
      this.refresh();
    }
  }
  actionBegin(args: any) {
    if (args.requestType == "delete") {
      console.log(args.data);
      this.deleteMetier.emit(args.data[0]._id);
    }
  }
}

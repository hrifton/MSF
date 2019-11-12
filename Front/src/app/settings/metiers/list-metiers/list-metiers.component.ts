import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { Metier } from 'src/app/Class/Metier';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {
  GridComponent,
  ToolbarItems,
  EditSettingsModel,
  SelectionSettingsModel,
  RowDataBoundEventArgs
} from '@syncfusion/ej2-angular-grids';

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
  public toolbarItems: ToolbarItems[] | object;
  public editOptions: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;

  public orderidrules: Object;

  show: boolean;

  ngOnInit() {
    console.log(this.metiers);
    this.data = this.metiers;
    this.pageSettings = { pageCount: 5 };
    this.filterSettings = { type: "Menu" };
    this.toolbarItems = this.itemToolBar;
    this.editOptions = {
      allowEditing: true,
      allowDeleting: true,
      mode: "Normal"
    };
    this.selectionOptions = { type: "Multiple" };
    // this.orderidrules = { required: true };
  }

  rowSelected($event) {
    this.selection = $event.data;
    this.messageEvent.emit($event.data);
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === "delete") {
      this.deleteMetier.emit(this.selection);
    }
  }
  refresh() {
    this.grid.refresh();
  }
}

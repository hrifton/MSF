import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  FilterService,
  GridComponent,
  EditService,
  SortService,
  ToolbarService,
  ToolbarItems,
  EditSettingsModel,
  ForeignKeyService,
  SelectionSettingsModel
} from "@syncfusion/ej2-angular-grids";
import { Metier } from "src/app/Class/Metier";
import { Categorie } from 'src/app/Class/Categorie';
@Component({
  selector: "app-list-categorie",
  templateUrl: "./list-categorie.component.html",
  styleUrls: ["./list-categorie.component.scss"]
})
export class ListCategorieComponent implements OnInit {
  @Input() metierSelect: Metier;
  @Input() listCat: Categorie[];
  constructor() { }

  @ViewChild("grid")
  public grid: GridComponent;
  public data = this.listCat;
  public pageSettings: Object;
  public filterSettings: Object;
  public toolbarItems: ToolbarItems[];
  public editOptions: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;

  public orderidrules: Object;

  show: boolean;

  ngOnInit() {
    this.pageSettings = { pageCount: 5 };
    this.filterSettings = { type: "Menu" };
    this.toolbarItems = ["Edit", "Delete", "Update", "Cancel"];
    this.editOptions = {
      allowEditing: true,
      allowDeleting: true,
      mode: "Normal"
    };
    this.selectionOptions = { type: "Multiple" };
    // this.orderidrules = { required: true };
  }
}

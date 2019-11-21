import { Component, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
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
@Component({
  selector: "app-list-categorie",
  templateUrl: "./list-categorie.component.html",
  styleUrls: ["./list-categorie.component.scss"]
})
export class ListCategorieComponent implements OnInit {
  @Input() metierSelect: any;
  @Input() itemToolBar: any;
  @Output() delSubCatStandar = new EventEmitter<any>();
  
  constructor() {}

  @ViewChild("grid")
  public grid: GridComponent;
  public data: Object[];
  public pageSettings: Object;
  public filterSettings: Object;
  public toolbarItems: ToolbarItems[];
  public editOptions: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;

  public orderidrules: Object;

  show: boolean;

  ngOnInit() {
    this.data = this.metierSelect.categorie;
    console.log("data : ", this.data);
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.metierSelect.firstChange === false) {
      this.data = changes.metierSelect.currentValue.categorie;
    }
  }

  actionBegin(args: any) {
    if (args.requestType == "delete") {
      let subCatDel = {
        idSubCat: args.data[0]._id,
        idCat: this.metierSelect._id
      };
      this.delSubCatStandar.emit(subCatDel);
    }
  }
}

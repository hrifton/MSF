import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {Metier} from 'src/app/class/Metier';
import {
  GridComponent,
  ToolbarItems,
  EditSettingsModel,
  SelectionSettingsModel
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-list-metiers',
  templateUrl: './list-metiers.component.html',
  styleUrls: ['./list-metiers.component.scss']
})
export class ListMetiersComponent implements OnInit {
  @Input() metiers: Metier[];
  @Output() messageEvent = new EventEmitter<Metier>();
  constructor() {
    console.log('ici Metier');
  }
  @ViewChild('grid')
  public grid: GridComponent;
  public data: any;
  public pageSettings: Object;
  public filterSettings: Object;
  public toolbarItems: ToolbarItems[];
  public editOptions: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;

  public orderidrules: Object;

  show: boolean;

  ngOnInit() {
    this.data = this.metiers;
    this.pageSettings = { pageCount: 5 };
    this.filterSettings = { type: 'Menu' };
    this.toolbarItems = ['Edit', 'Delete', 'Update', 'Cancel'];
    this.editOptions = {
      allowEditing: true,
      allowDeleting: true,
      mode: 'Normal'
    };
    this.selectionOptions = { type: 'Multiple' };
    // this.orderidrules = { required: true };
  }

  rowSelected($event) {
    console.log($event.data);
    this.messageEvent.emit($event.data);
  }
}

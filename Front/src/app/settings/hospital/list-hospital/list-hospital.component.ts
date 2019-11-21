import { Component, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
/*import {
  ContextMenuItem,
  EditSettingsModel,
  NewRowPosition,
} from '@syncfusion/ej2-grids';*/
import {
  FilterService,
  GridComponent,
  EditService,
  SortService,
  ToolbarService,
  ToolbarItems,
  EditSettingsModel,
  ForeignKeyService
} from '@syncfusion/ej2-angular-grids';
import { HopitalService } from 'src/app/Service/hopital.service';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-calendars/src';
import { Hospital } from 'src/app/Class/Hospital';

@Component({
  selector: 'app-list-hospital',
  templateUrl: './list-hospital.component.html',
  styleUrls: ['./list-hospital.component.scss']
})
export class ListHospitalComponent implements OnInit {
  @Input() addToListHospital: Hospital;
  @Input() projet: Hospital;

    @Output() HopitalDelete = new EventEmitter<Hospital>();
  constructor(private hs: HopitalService) { }
  @ViewChild("grid") public grid: GridComponent;
  selection: any;



  public data: any;
  public pageSettings: Object;
  public filterSettings: Object;
  public toolbarItems: ToolbarItems[];
  public editOptions: EditSettingsModel;
  @Output() messageEvent = new EventEmitter<Hospital>();

  public orderidrules: Object;

  show: boolean;

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };
  public ngOnInit(): void {
    this.show = false;
    this.data = this.projet;

    this.pageSettings = { pageCount: 5 };
    this.filterSettings = { type: 'Menu' };
    this.toolbarItems = ['Delete'];
    this.editOptions = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal'
    };
    this.orderidrules = { required: true };
  }

  actionBegin(args: any): void {
    console.log(args)
    if (args.requestType == "delete") {
      console.log("Delete*************");
      console.log(args.data[0]._id);
      this.HopitalDelete.emit(args.data[0]._id);
    }
  }
  /* ngOnChanges(changes: SimpleChanges) {
     if (changes.addToListHospital) {
       this.data.push(changes.addToListHospital.currentValue);
 
     }
     // You can also use yourInput.previousValue and
   }
 */
  refreshGrid() {
    this.grid.refresh();
  }
  rowSelected($event) {
    console.log($event)
    this.selection = $event.data;
    this.messageEvent.emit($event.data);
  }
}

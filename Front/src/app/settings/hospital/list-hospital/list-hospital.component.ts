import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
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
  constructor(private hs: HopitalService) {}
  @ViewChild('grid')
  public grid: GridComponent;
  public data: any;
  public pageSettings: Object;
  public filterSettings: Object;
  public toolbarItems: ToolbarItems[];
  public editOptions: EditSettingsModel;
 
  public orderidrules: Object;

  show: boolean;

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };
  public ngOnInit(): void {
    this.show = false;
    this.hs.getHospital().subscribe(data => {
      this.data = data;
      this.show = true;
    });
    this.pageSettings = { pageCount: 5 };
    this.filterSettings = { type: 'Menu' };
    this.toolbarItems = ['Edit', 'Delete', 'Update', 'Cancel'];
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
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.addToListHospital) {
      console.log(changes.addToListHospital);
      this.data.push(changes.addToListHospital.currentValue);
      this.grid.refresh();
    }
    // You can also use yourInput.previousValue and
  }
}

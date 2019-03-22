import {Component, OnInit} from '@angular/core';
import Intervention from '../Intervention';
import {InterventionService} from '../intervention.service';
import { ActivatedRoute, Router } from '@angular/router';

import { EditService, ToolbarService, PageService,SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataManager, ODataV4Adaptor,Query } from '@syncfusion/ej2-data';


@Component(
    {
    selector: 'app-liste-intervention',
    templateUrl: './liste-intervention.component.html',
    styleUrls: ['./liste-intervention.component.scss'],
    providers: [ToolbarService, EditService, PageService]}
)
export class ListeInterventionComponent implements OnInit {

   public interventions: Intervention[];
    public data: DataManager;
    public filterSettings: Object;
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public pageSettings: Object;
    public editparams: Object;
    public query: Query;
    public priorityrules: Object;
    public dropData: string[];


    constructor(private is: InterventionService,private route: ActivatedRoute,private router: Router) {
    }
   actionComplete(args) {
      if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          let dialog = args.dialog;
          // change the header of the dialog
          dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData['_id'] : 'New Customer';
      }
    }
    actionBegin(args: SaveEventArgs): void {
     if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          alert(args.requestType)
      }
     if (args.requestType === 'save') {

      this.updateIntervention( args.data['departement'],
      args.data['locality'],
      args.data['priority'],
      args.data['day'],
      args.data['description'],
      args.data['status'],
      args.data['type'],
      args.data['_id']);
      }
    }

    ngOnInit() {
        this.filterSettings = {
            type: 'Menu'
        };

        this
            .is
            .getInterventions()
            .subscribe((data : Intervention[]) => {
                this.interventions = data;
            });
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Edit', 'Delete'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules = { required: true };
        this.editparams = { params: { popupHeight: '100px' }};
        this.pageSettings = { pageCount: 5};
        this.dropData = ['Order Placed', 'Processing', 'Delivered'];
    }
    updateIntervention(departement, locality, priority, day, description,status,type,id) {

      this.route.params.subscribe(params => {
        this.is.updateIntervention(departement, locality, priority, day, description,status,type,id);

   });

}
}

import {Component, OnInit} from '@angular/core';
import Intervention from '../Intervention';
import {InterventionService} from '../intervention.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { DataManager, ODataV4Adaptor,Query } from '@syncfusion/ej2-data';


@Component(
    {
    selector: 'app-liste-intervention',
    templateUrl: './liste-intervention.component.html',
    styleUrls: ['./liste-intervention.component.scss'],
    providers: [ToolbarService, EditService, PageService]}
)
export class ListeInterventionComponent implements OnInit {

   // public interventions: Intervention[];
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


    angForm: FormGroup;

    createForm() {
        this.angForm = this
            .fb
            .group({
                departement: [
                    '', Validators.required
                ],
                locality: [
                    '', Validators.required
                ],
                priority: [
                    '', Validators.required
                ],
                date: [
                    '', Validators.required
                ],
                description: ['', Validators.required]
            });
    }

    constructor(private is : InterventionService, private fb : FormBuilder) {
      this.editSettings = {    }
    }

    ngOnInit() {
        this.filterSettings = {
            type: 'Menu'
        };
        /*   this
            .is
            .getInterventions()
            .subscribe((data : Intervention[]) => {
                this.interventions = data;
            });*/
            this.data = new DataManager({
              url: 'http://localhost:4000/intervention',
              adaptor: new ODataV4Adaptor,
              offline: true
          });
            this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
            this.toolbar = ['Edit', 'Delete'];
            this.orderidrules = { required: true, number: true };
            this.customeridrules = { required: true };
            this.freightrules = { required: true };
            this.editparams = { params: { popupHeight: '100px' }};
            this.pageSettings = { pageCount: 5};
            this.query = new Query().addParams('ej2grid', 'true');
            console.log(this.query);


    }
}

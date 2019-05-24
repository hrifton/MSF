import {Component, OnInit, Input} from '@angular/core';
import {EditService, ToolbarService, PageService, SaveEventArgs} from '@syncfusion/ej2-angular-grids';
import {ActivatedRoute, Router} from '@angular/router';

import Metier from '../Metier';
import { MetierService } from 'src/app/Service/metier.service';

@Component({
    selector: 'app-liste-corpMetier',
    templateUrl: './liste-corpMetier.component.html',
    styleUrls: ['./liste-corpMetier.component.css'],
    providers: [ToolbarService, EditService, PageService]
})
export class ListeCorpMetierComponent implements OnInit {

    @Input()metiers: Metier[];
    public filterSettings: Object;
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public pageSettings: Object;
    public editparams: Object;
    public priorityrules: Object;
    public dropData: string[];

    constructor(
        private ms: MetierService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.filterSettings = {
            type: 'Menu'
        };

        this.editSettings = {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            mode: 'Dialog'
        };
        this.toolbar = ['Edit', 'Delete'];
        this.orderidrules = {
            required: true,
            number: true
        };
        this.customeridrules = {
            required: true
        };
        this.freightrules = {
            required: true
        };
        this.editparams = {
            params: {
                popupHeight: '100px'
            }
        };
        this.pageSettings = {
            pageCount: 5
        };
        this.dropData = ['Order Placed', 'Processing', 'Delivered'];

    }

    actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            const dialog = args.dialog;
            // change the header of the dialog
            dialog.header = args.requestType === 'beginEdit'
                ? 'Record of ' + args.rowData._id
                : 'New Customer';
        }
    }
 /*   actionBegin(args: SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            // alert(args.requestType)
        }
        if (args.requestType === 'save') {

            this.updateMetier(args.data.metier, args.data._id);
        }

    }*/

    updateMetier(metier, id) {
        this
            .route
            .params
            .subscribe(params => {
                this
                    .ms
                    .updateMetier(metier, id);

            });

    }
}

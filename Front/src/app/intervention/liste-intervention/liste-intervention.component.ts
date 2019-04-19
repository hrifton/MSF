import { Component, OnInit } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { EditService, ToolbarService, PageService, DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';

import Intervention from '../Intervention';
import {InterventionService} from '../intervention.service';
import Departement from 'src/app/setting/departement/Departement';
import { DepartementService } from 'src/app/setting/departement/departement.service';


@Component({
    selector: 'app-liste-intervention',
    templateUrl: './liste-intervention.component.html',
    styleUrls: ['./liste-intervention.component.scss'],
    providers: [ToolbarService, EditService, PageService]
})
export class ListeInterventionComponent implements OnInit {

    public interventions: Intervention[];
    public res:string;
    public departements: string[];
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
    //
    public angForm: FormGroup;
    public shipCityDistinctData: Object[];
    public shipCountryDistinctData: Object[];
    public submitClicked = false;
  route: any;
    constructor(private is: InterventionService, private ds: DepartementService
    ) {}
  /*  actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            let dialog = args.dialog;
            // change the header of the dialog
            dialog.header = args.requestType === 'beginEdit'
                ? 'Record of ' + args.rowData['_id']
                : 'New Customer';
        }
    }
    actionBegin(args : SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            // alert(args.requestType)
        }
        if (args.requestType === 'save') {

            this.updateIntervention(
                args.data['departement'],
                args.data['locality'],
                args.data['priority'],
                args.data['day'],
                args.data['description'],
                args.data['status'],
                args.data['type'],
                args.data['_id']
            );
        }
    }*/

    /*clickHandler(args: ClickEventArgs): void {
        if (args.item.id === 'Click') {
            alert("Custom Toolbar Click...");
        }
    }*/

    ngOnInit() {
        this.filterSettings = {
            type: 'Menu'
        };



        this
            .ds
            .getDepartements()
            .subscribe((data: Departement[]) => {
                this.getDepartement(data);
            });

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



    createFormGroup(data: any): FormGroup {
data = this.replace_idByid(data);
console.log(data)
return new FormGroup({
          id: new FormControl(data.id, Validators.required),
          departement: new FormControl(data.departement, Validators.required),
          locality: new FormControl(data.locality, Validators.required),
          priority: new FormControl(data.priority),
          day: new FormControl(data.day),
          description: new FormControl(data.description),
          status: new FormControl(data.status),
          type: new FormControl(data.type),
          tech: new FormControl(data.tech),
          useMat: new FormControl(data.useMat),
          asset:new FormControl(data.asset)
      });
  }

  dateValidator() {
      return (control: FormControl): null | Object  => {
          return control.value && control.value.getFullYear &&
          (1900 <= control.value.getFullYear() && control.value.getFullYear() <=  2099) ? null : { OrderDate: { value : control.value}};
      };
  }

  actionBegin(args: SaveEventArgs): void {
      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        console.log(args.requestType)
          this.submitClicked = false;
          this.angForm = this.createFormGroup(args.rowData);

      }
      if (args.requestType === 'save') {

          this.submitClicked = true;
          if (this.angForm.valid) {
            args.data = this.angForm.value;
          } else {
            args.cancel = true;
          }
      }
  }

  actionComplete(args: DialogEditEventArgs): void {
      if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

          if (Browser.isDevice) {
              args.dialog.height = window.innerHeight - 500 + 'px';
              (args.dialog as Dialog).dataBind();
          }
          /* Set initail Focus
          if (args.requestType === 'beginEdit') {
              (args.form.elements.namedItem('id') as HTMLInputElement).focus();
          } else if (args.requestType === 'add') {
              (args.form.elements.namedItem('id') as HTMLInputElement).focus();
          }*/
      }
  }

  // get departement(): AbstractControl  { return this.angForm.get('departement'); }

  // get CustomerName(): AbstractControl { return this.angForm.get('CustomerName'); }

  // get OrderDate(): AbstractControl { return this.angForm.get('OrderDate'); }

    updateIntervention(data) {
      console.log(data)
      this
            .route
            .params
            .subscribe(params => {
                this
                    .is
                    .updateIntervention(data);

            });

    }
    getDepartement(data) {

      const departementsList = new Array();

      data.forEach((element, index) => {
         departementsList.push(element.departement );
        });

      this.departements = departementsList;
    }

    replace_idByid(data) {
      data = JSON.stringify(data);
      data = data.replace(/_id/g, 'id');
      data = JSON.parse(data);
      return data;
    }
  }



/*
export interface IOrderModel {
    id?: number;
    departement?: string;
    locality?: string;
    priority?: string;
    day?: string;
    description?: string;
    status?: string;
    type?: string;
    tech?: string;
  }

arrJson = text.replace(/=/g, '":"');
			arrJson = arrJson.replace(/PropositionStage/g, '');
			arrJson = arrJson.replace(/\(/g, '{"');
			arrJson = arrJson.replace(/\)/g, '"}');
			arrJson = arrJson.replace(/{id/g, '"id');
			arrJson = arrJson.replace(/},/g, '},{');
			arrJson = arrJson.replace(/{{/g, '{{"');
			arrJson = arrJson.replace(/, /g, '","');
			arrJson = arrJson.replace(/}","{/g, '},');
			arrJson = arrJson.replace(/{ {/g, '{'); */

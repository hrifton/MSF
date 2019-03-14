import {Component, OnInit} from '@angular/core';
import Intervention from '../Intervention';
import {InterventionService} from '../intervention.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component(
    {
    selector: 'app-liste-intervention',
    templateUrl: './liste-intervention.component.html',
    styleUrls: ['./liste-intervention.component.scss']}
)
export class ListeInterventionComponent implements OnInit {

    public interventions: Intervention[];
    public filterSettings: Object;
    public editSettings: EditSettingsModel;
    public toolbar: ToolbarItems[];
    public orderIDRules: Object;
    public customerIDRules: Object;

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
      this.editSettings = {
        allowEditing: true,


    }
    }
    public customFn: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
      return args['value'].length >= 5;
  };
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
            this.orderIDRules = { required: true };
        this.customerIDRules = { required: true, minLength: [this.customFn, 'Need atleast 5 letters'] };
    }
}

import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DepartementService} from '../departement.service';
import {Query, DataManager, ODataV4Adaptor} from '@syncfusion/ej2-data';
import Departement from '../Departement';

@Component(
    {selector: 'app-setting-departement',
     templateUrl: './setting-departement.component.html',
     styleUrls: ['./setting-departement.component.scss']}
)
export class SettingDepartementComponent implements OnInit {

    @Input()departements: Departement[];
    @Output() departementsOut = new EventEmitter<Departement>();
    angForm: FormGroup;
    breakpoint: number;
    public departement: string;

    constructor(private fb: FormBuilder, private ds: DepartementService) {
        this.createForm();
    }

    // Creation du formulaire avec champ validation
    createForm() {
        this.angForm = this
            .fb
            .group({
                departement: ['', Validators.required]
            });
    }

    ngOnInit() {
        this.breakpoint = (window.innerWidth <= 1000)
            ? 1
            : 4;
    }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 1000)
            ? 1
            : 4;
    }

    addNewDepartement(departement) {
        let cptFalse = 0;
        this
            .departements
            .forEach(element => {
                if (element.departement != departement) {
                    cptFalse++;
                }
            });
        if (cptFalse == this.departements.length) {
          alert('pas de doublon');
          let result;
          this.ds.addDeparement(departement).subscribe(res => {this.departementsOut.emit(res.departement); });



        } else {
            alert('doublon');
        }
    }

}

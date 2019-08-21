import { DepartementService } from '../../Service/departement.service';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import Departement from 'src/app/setting/departement/Departement';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { InterventionService } from '../../Service/intervention.service';
import { ToastrService } from 'ngx-toastr';
import Intervention from 'src/app/Class/Intervention';
import * as moment from 'moment';




@Component({
  selector: 'app-formulaire-intervention',
  templateUrl: './formulaire-intervention.component.html',
  styleUrls: ['./formulaire-intervention.component.scss']
})
export class FormulaireInterventionComponent implements OnInit {
  @Input() user;
  @Output() messageEvent = new EventEmitter<Intervention>();

  inter = new Intervention();
  public lPriority: { [key: string]: Object }[] = [
    { priority: 'High', code: 'High' },
    { priority: 'Medium', code: 'Medium' },
    { priority: 'Low', code: 'Low' },
  ];
  today = new Date();
  departements: Departement[];

  description: Text;
  angForm: FormGroup;
  breakpoint: number;
  departement: any;
  errors = 'errorMessages';

  constructor(private fb: FormBuilder, private is: InterventionService, private ds: DepartementService, private ref: ChangeDetectorRef) {
    this.createForm();


  }
  createForm() {
    this.angForm = this.fb.group({
      departement: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      asset: new FormControl('')
    });
    this.messageEvent.emit(this.inter);
  }

  ngOnInit() {

    this.ds.getDepartements().subscribe((data: Departement[]) => {
      this.departements = data;

    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 4;
  }


  showSuccess() {
    //   this.toastr.success('Hello world!', 'Toastr fun!');
  }
  /*addIntervention(departement, locality, priority, day, description) {

      let tmp;
       // this.showSuccess();
       // this.is.addIntervention(departement, locality, priority, day, description);
      this.inter.departement = departement,
      this.inter.locality = locality,
      this.inter.priority = priority,
      this.inter.day = day,
      this.inter.description = description,
      this.inter.status = 'en_cours',
      this.inter.user=this.user.fullName,
      this.inter.type='JobRequest',


      tmp = this.is.postInter(this.inter);
      this.messageEvent.emit(this.inter);
      this.angForm.reset();



       }*/

  addIntervention(data) {
    const inter = data.value;
    inter.user = this.user.fullName;
    inter.type = 'JobRequest';
    inter.status = 'In progress';
    inter.day = moment().format('DD/MM/YYYY');

    this.is.postInter(inter);
    this.messageEvent.emit(inter);
    this.angForm.reset();
  }




}



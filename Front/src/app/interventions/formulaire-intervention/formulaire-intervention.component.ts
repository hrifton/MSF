import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms';
import Intervention from 'src/app/Class/Intervention';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-formulaire-intervention',
  templateUrl: './formulaire-intervention.component.html',
  styleUrls: ['./formulaire-intervention.component.scss']
})
export class FormulaireInterventionComponent implements OnInit {

  constructor(private fb: FormBuilder, protected us: UserService) {
    this.createForm();
  }
  @Input() user;
  @Input() departements;
  @Input() statusInsertIntervention;
  @Output() messageEvent = new EventEmitter<Intervention>();
  @Output() statusRequest = new EventEmitter<Boolean>();

  public lPriority: { [key: string]: Object }[] = [
    { priority: 'High', code: 'High' },
    { priority: 'Medium', code: 'Medium' },
    { priority: 'Low', code: 'Low' }
  ];
  today = new Date();

  description: Text;
  angForm: FormGroup;
  breakpoint: number;
  departement: any;
  errors = 'errorMessages';

  @ViewChild('element') element;

  public position = { X: 'Center' };

  createForm() {
    this.angForm = this.fb.group({
      idDepartement: new FormControl('', [
        Validators.required
      ]),
      locality: new FormControl(''),
      priority: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      asset: new FormControl('')
    });
  }

  ngOnInit() {

  }

  showSuccess() {

    // this.toastr.success('Hello world!', 'Toastr fun!');
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.statusInsertIntervention.currentValue === undefined) {

      console.log("indefenid")
    } else {
      if (changes.statusInsertIntervention.currentValue === true) {
        this.showToast();
        this.statusRequest.emit(null);
      }
    }
  }

  addIntervention(data) {
    this.messageEvent.emit(data.value);
    this.angForm.reset();
  }



  showToast() {
    //this.element.width = '100%';
    this.element.title = '<center>Success</center>';
    this.element.animation.show.effect = 'FlipRightDownIn';
    this.element.content = '<div class=\'e-custom\'><center>Your intervention is correctly recorded</center></div>';
    this.element.cssClass = 'e-toast-success';
    this.element.show({ timeOut: 4000 });
  }

}

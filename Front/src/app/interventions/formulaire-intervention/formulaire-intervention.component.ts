import { DepartementService } from '../../Service/departement.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms';
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
  @Input() departements;

  @Output() messageEvent = new EventEmitter<Intervention>();

  inter = new Intervention();
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

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      departement: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      asset: new FormControl(''),
      
    });

  }

  ngOnInit() {}

  showSuccess() {
    //   this.toastr.success('Hello world!', 'Toastr fun!');
  }

  addIntervention(data) {
    this.messageEvent.emit(data.value);
    this.angForm.reset();
  }
}

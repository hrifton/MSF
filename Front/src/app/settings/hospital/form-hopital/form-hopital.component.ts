import {
  Component,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { HopitalService } from 'src/app/Service/hopital.service';
import { Hospital } from 'src/app/Class/Hospital';
import {
  ToastComponent,
  ToastCloseArgs
} from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-form-hopital',
  templateUrl: './form-hopital.component.html',
  styleUrls: ['./form-hopital.component.scss']
})
export class FormHopitalComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private hs: HopitalService) {}
  hopitalForm: FormGroup;
  lcountry: any[];
  @ViewChild('defaulttoast')
  public toastObj: ToastComponent;
  /**
   * element validation form for new Hospital
   */
  createForm() {
    this.hopitalForm = this.fb.group({
      project: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      startingDate: new FormControl('', [Validators.required]),
      closuredate: new FormControl('', [Validators.required]),
      ipdStructure: new FormControl(),
      leveOfCare: new FormControl()
    });
  }
  /**
   * possible verification processing before sending
   * create CodeProject whit codeCountry and nameOfProject
   */
  saveNewHospital(hospital: Hospital) {
    this.hs.PostNewHospital(hospital).subscribe(data => 
       this.messageEvent.emit(data)
       );
  }

  public onChange(args: SimpleChange): void {
    console.log(args);
  }
  ngOnInit() {
    this.hs.getCountry().subscribe(data => (this.lcountry = data));
    this.createForm();
  }
}

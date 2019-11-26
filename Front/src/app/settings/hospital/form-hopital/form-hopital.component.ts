import {
  Component,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
  EventEmitter,
  Input
} from "@angular/core";
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
  selector: "app-form-hopital",
  templateUrl: "./form-hopital.component.html",
  styleUrls: ["./form-hopital.component.scss"]
})
export class FormHopitalComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() projet;
  type: string;
  constructor(private fb: FormBuilder, private hs: HopitalService) {}
  hopitalForm: FormGroup;
  lcountry: any[];
  @ViewChild("defaulttoast")
  public toastObj: ToastComponent;
  /**
   * element validation form for new Hospital
   */

  ngOnInit() {
    this.hs.getCountry().subscribe(data => (this.lcountry = data));
    console.log(this.lcountry);
    this.createForm(this.projet);
  }
  public createForm(data?) {
    if (data) {
      this.hopitalForm = this.fb.group({
        project: new FormControl(data.project ? data.project : "", [
          Validators.required
        ]),
        country: new FormControl(data.country ? data.country : "", [
          Validators.required
        ]),
        startingDate: new FormControl(
          data.startingDate ? data.startingDate : "",
          [Validators.required]
        ),
        closuredate: new FormControl(data.closuredate ? data.closuredate : "", [
          Validators.required
        ]),
        ipdStructure: new FormControl(
          data.ipdStructure ? data.ipdStructure : ""
        ),
        leveOfCare: new FormControl(data.leveOfCare ? data.leveOfCare : "")
      });
      this.type = "Update";
    } else {
      this.hopitalForm = this.fb.group({
        project: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        startingDate: new FormControl("", [Validators.required]),
        closuredate: new FormControl("", [Validators.required]),
        ipdStructure: new FormControl(""),
        leveOfCare: new FormControl("")
      });
      this.type = "Save";
    }
  }

  /**saveNewHospital
   * send data to parent for save
   * @param hospital
   */
  saveNewHospital(hospital: Hospital) {
    this.messageEvent.emit(hospital);
  }

  updateHospital(hospital: Hospital) {
    console.log(hospital);
  }
  clearForm() {
    this.type = "Save";
  }

  public onChange(args: SimpleChange): void {
    console.log(args);
  }
}

import { Component, OnInit, SimpleChange } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MultiSelectComponent } from "@syncfusion/ej2-angular-dropdowns";
import { HopitalService } from "src/app/Service/hopital.service";
import { Hospital } from "src/app/Class/Hospital";

@Component({
  selector: "app-form-hopital",
  templateUrl: "./form-hopital.component.html",
  styleUrls: ["./form-hopital.component.scss"]
})
export class FormHopitalComponent implements OnInit {
  hopitalForm: FormGroup;
  lcountry: any[];
  constructor(private fb: FormBuilder, private hs: HopitalService) {}
  /**
   * element validation form for new Hospital
   */
  createForm() {
    this.hopitalForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      zipCode: new FormControl(),
      address: new FormControl(),
      number: new FormControl()
    });
  }
  /**
   * possible verification processing before sending
   */
  saveNewHospital(hospital: Hospital) {
  hospital["value"].slug = hospital["value"].country + hospital["value"].name;
  this.hs.PostNewHospital(hospital)
  }

  public onChange(args: SimpleChange): void {
    console.log(args);
  }
  ngOnInit() {
    this.hs.getCountry().subscribe(data => (this.lcountry = data));
    this.createForm();
  }
}

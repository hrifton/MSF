import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import Intervention from "src/app/Class/Intervention";
import { UserService } from "src/app/Service/user.service";

@Component({
  selector: "app-formulaire-intervention",
  templateUrl: "./formulaire-intervention.component.html",
  styleUrls: ["./formulaire-intervention.component.scss"]
})
export class FormulaireInterventionComponent implements OnInit {
  @Input() user;
  @Input() departements;

  @Output() messageEvent = new EventEmitter<Intervention>();

  public lPriority: { [key: string]: Object }[] = [
    { priority: "High", code: "High" },
    { priority: "Medium", code: "Medium" },
    { priority: "Low", code: "Low" }
  ];
  today = new Date();

  description: Text;
  angForm: FormGroup;
  breakpoint: number;
  departement: any;
  errors = "errorMessages";

  constructor(private fb: FormBuilder, protected us: UserService) {
    this.createForm();
    console.log("Departement constructor : ", this.us.getIdDepartement());
  }

  createForm() {
    this.angForm = this.fb.group({
      idDepartement: new FormControl("", [
        Validators.required
      ]),
      locality: new FormControl(""),
      priority: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      asset: new FormControl("")
    });
    console.log(this.angForm)
  }

  ngOnInit() {
    console.log("Departement ngOnInit : ", this.departements);
  }

  showSuccess() {
    //   this.toastr.success('Hello world!', 'Toastr fun!');
  }

  addIntervention(data) {
    this.messageEvent.emit(data.value);
    this.angForm.reset();
  }
}

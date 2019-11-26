import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Metier } from "src/app/Class/Metier";

@Component({
  selector: "app-formulaire-metier",
  templateUrl: "./formulaire-metier.component.html",
  styleUrls: ["./formulaire-metier.component.scss"]
})
export class FormulaireMetierComponent implements OnInit {
  public metierForm: FormGroup;

  @Output() messageEvent = new EventEmitter<Metier>();

  constructor(private fb: FormBuilder) {
    this.createFormMetier();
  }

  ngOnInit() {}

  createFormMetier() {
    this.metierForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      color: new FormControl("", [Validators.required]),
      description: new FormControl("")
    });
  }
  saveMetier(data) {
    console.log(this.messageEvent);
    this.messageEvent.emit(data.value);
    this.metierForm.reset();
  }
}

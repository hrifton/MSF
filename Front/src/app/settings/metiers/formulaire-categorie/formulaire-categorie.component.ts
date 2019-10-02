import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Metier } from "src/app/Class/Metier";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Categorie } from "src/app/Class/Categorie";

@Component({
  selector: "app-formulaire-categorie",
  templateUrl: "./formulaire-categorie.component.html",
  styleUrls: ["./formulaire-categorie.component.scss"]
})
export class FormulaireCategorieComponent implements OnInit {
  public categorieForm: FormGroup;

  @Input() metierSelect: Metier[];
  @Output() messageEvent = new EventEmitter<Categorie>();

  constructor(private fb: FormBuilder) {
    this.createFormMetier();
  }

  ngOnInit() {}

  createFormMetier() {
    this.categorieForm = this.fb.group({
      categorie: new FormControl("", [Validators.required])
    });
  }

  saveCat(data) {
    console.log(data);
    console.log(this.messageEvent);
    this.messageEvent.emit(data.value);
    // this.categorieForm.reset();
  }
}

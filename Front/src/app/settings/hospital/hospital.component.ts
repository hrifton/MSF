import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Hospital } from "src/app/Class/Hospital";
import { Metier } from "src/app/Class/Metier";
import { FormHopitalComponent } from "./form-hopital/form-hopital.component";
import { Categorie } from 'src/app/Class/Categorie';
import Departement from 'src/app/Class/Departement';

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styleUrls: ["./hospital.component.scss"]
})
export class HospitalComponent implements OnInit {
  // metiers = new Array<Metier>();
  constructor() {}

  @ViewChild(FormHopitalComponent)
  FormHopitalComponent: FormHopitalComponent;

  data: Hospital;
  public metierSelect: Metier;
  @Input() role;
  @Input() projet;
  @Input() metiers;
  @Input() departements;
  @Output() messageEvent = new EventEmitter<Metier>();
  @Output() rmMetierEvent = new EventEmitter<Metier>();
  @Output() addSubToHopital = new EventEmitter<Categorie>();
  @Output() rmSubToHopital = new EventEmitter<Categorie>();
  @Output() addDepToHopital = new EventEmitter<Departement>();
  @Output() rmDepToHopital = new EventEmitter<Departement>();

  ngOnInit() {}

  update($event) {
    this.data = $event;
  }
  selectHopital($event) {
    this.FormHopitalComponent.createForm($event);
    this.projet = $event;
  }
  addMetier($event) {
    $event.idHopital = this.projet[0]._id;
    this.messageEvent.emit($event);
  }

  rmMetier($event) {
    $event.idHopital = this.projet[0]._id;
    this.rmMetierEvent.emit($event);
  }

  selectMetier($event) {
    this.metierSelect = $event;
  }

  rmSubCat($event) {
    $event.idHopital = this.projet[0]._id;
    this.rmSubToHopital.emit($event);
  }

  addSubCat($event) {
    $event.idHopital = this.projet[0]._id;
    this.addSubToHopital.emit($event);
  }

  addDepartement($event) {
    console.log($event)
    $event.idHopital = this.projet[0]._id;
    this.addDepToHopital.emit($event);
  }
  delDepartement($event) {
    console.log($event);
    $event.idHopital = this.projet[0]._id;
     this.rmDepToHopital.emit($event);
  }
}

import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Hospital } from "src/app/Class/Hospital";
import { Metier } from "src/app/Class/Metier";
import { FormHopitalComponent } from "./form-hopital/form-hopital.component";
import { Categorie } from 'src/app/Class/Categorie';
import Departement from 'src/app/Class/Departement';
import { HopitalService } from 'src/app/Service/hopital.service';
import { ListHospitalComponent } from './list-hospital/list-hospital.component';

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styleUrls: ["./hospital.component.scss"]
})
export class HospitalComponent implements OnInit {
  // metiers = new Array<Metier>();
  constructor(private hs: HopitalService) { }

  @ViewChild(FormHopitalComponent)
  FormHopitalComponent: FormHopitalComponent;

  data: Hospital;
  public metierSelect: Metier;
  @Input() flagTosteAddHostpital
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
  @Output() addNewHopital = new EventEmitter<Hospital>();

  projetMetier: any = null;


  @ViewChild(ListHospitalComponent)
  listHospitalComponent: ListHospitalComponent;
  ngOnInit() {
    this.projetMetier = this.projet[0]
  }

  saveHospital($event) {
    //crée un tableau avec tout les hopitaux
    this.addNewHopital.emit($event)
  }
  selectHopital($event) {
    this.projetMetier = null
    this.FormHopitalComponent.createForm($event);
    this.projetMetier = $event;
    this.projet = $event;
  }
  addMetier($event) {
    console.log(this.projet)
    if ($event.idHopital == undefined) {
      $event.idHopital = this.projet._id;
    }
    this.messageEvent.emit($event);
  }

  rmMetier($event) {
    if ($event.idHopital == undefined) {
      $event.idHopital = this.projet[0]._id;
    }
    this.rmMetierEvent.emit($event);
  }

  selectMetier($event) {
    this.metierSelect = $event;
  }

  rmSubCat($event) {
    if ($event.idHopital == undefined) {
      console.log(this.projet[0]._id)
      $event.idHopital = this.projet[0]._id;
    }
    this.rmSubToHopital.emit($event);
  }

  addSubCat($event) {
    console.log($event)
    if ($event.idHopital == undefined) {
      console.log(this.projet[0])
      $event.idHopital = this.projet[0]._id;
    }
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

  refreshGridListeHopital() {
    this.listHospitalComponent.refreshGrid()
  }
  createFormHopital() {
    this.FormHopitalComponent.createForm();
  }
}

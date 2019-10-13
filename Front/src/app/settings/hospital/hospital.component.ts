import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Hospital } from "src/app/Class/Hospital";
import { Metier } from "src/app/Class/Metier";
import { FormHopitalComponent } from "./form-hopital/form-hopital.component";

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styleUrls: ["./hospital.component.scss"]
})
export class HospitalComponent implements OnInit {
  // metiers = new Array<Metier>();
  constructor() { }

  @ViewChild(FormHopitalComponent)
  FormHopitalComponent: FormHopitalComponent;

  data: Hospital;
  @Input() role;
  @Input() projet;
  @Input() metiers;
  @Output() messageEvent = new EventEmitter<Metier>();

  ngOnInit() { }

  update($event) {
    this.data = $event;
  }
  selectHopital($event) {
    this.FormHopitalComponent.createForm($event);
    this.projet = $event;
  }
  addMetier($event) {
    $event.idHopital = this.projet._id
    this.messageEvent.emit($event)
  }
}

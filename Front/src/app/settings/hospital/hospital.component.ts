import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Hospital } from "src/app/Class/Hospital";
import { Metier } from "src/app/Class/Metier";
import { FormHopitalComponent } from "./form-hopital/form-hopital.component";
import { Categorie } from "src/app/Class/Categorie";
import Departement from "src/app/Class/Departement";
import { HopitalService } from "src/app/Service/hopital.service";
import { ListHospitalComponent } from "./list-hospital/list-hospital.component";

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styleUrls: ["./hospital.component.scss"]
})
export class HospitalComponent implements OnInit {
  // metiers = new Array<Metier>();
  constructor(private hs: HopitalService) {}

  @ViewChild(FormHopitalComponent)
  FormHopitalComponent: FormHopitalComponent;

  data: Hospital;
  public metierSelect: Metier;
  @Input() flagTosteAddHostpital;
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
    this.projetMetier = this.projet[0];
  }

  saveHospital($event) {
    //crée un tableau avec tout les hopitaux
    this.addNewHopital.emit($event);
  }
  selectHopital($event) {
    this.projetMetier = null;
    this.FormHopitalComponent.createForm($event);
    this.projetMetier = $event;
    this.projet = $event;
    this.departements = this.departements;
  }
  addMetier($event) {
    if ($event.idHopital == undefined) {
      $event.idHopital = this.projet._id;
    }
    this.messageEvent.emit($event);
  }

  rmMetier($event) {
    if ($event.idHopital == undefined) {
      if (this.role != "SuperAdmin") {
        $event.idHopital = this.projet[0]._id;
      } else {
        $event.idHopital = this.projet._id;
      }
    }
    this.rmMetierEvent.emit($event);
  }

  selectMetier($event) {
    this.metierSelect = $event;
  }

  rmSubCat($event) {
    if ($event.idHopital == undefined) {
      if (this.role != "SuperAdmin") {
        console.log(this.projet);
        $event.idHopital = this.projet[0]._id;
      } else {
        console.log(this.projet);
        $event.idHopital = this.projet._id;
      }
    }
    this.rmSubToHopital.emit($event);
  }

  addSubCat($event) {
    if ($event.idHopital == undefined) {
      if (this.role != "SuperAdmin") {
        $event.idHopital = this.projet[0]._id;
      } else {
        $event.idHopital = this.projet._id;
      }
    }
    this.addSubToHopital.emit($event);
  }

  addDepartement($event) {
    if (this.role != "SuperAdmin") {
      $event.idHopital = this.projet[0]._id;
    } else {
      $event.idHopital = this.projet._id;
    }
    this.addDepToHopital.emit($event);
  }
  delDepartement($event:any) {
  console.log(this.projet)
      $event.idHopital = this.projet._id;
   
    this.rmDepToHopital.emit($event);
  }
  deleteHopital($event) {
    console.log($event)
    this.hs.delHopital($event).subscribe(data => {
      console.log(data);
    });
  }
  refreshGridListeHopital() {
    this.listHospitalComponent.refreshGrid();
  }
  createFormHopital() {
    this.FormHopitalComponent.createForm();
  }
}

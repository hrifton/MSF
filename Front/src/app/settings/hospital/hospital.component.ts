import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Hospital } from "src/app/Class/Hospital";
import { MetierService } from "src/app/Service/metier.service";
import { Metier } from "src/app/Class/Metier";
import { FormHopitalComponent } from './form-hopital/form-hopital.component';

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styleUrls: ["./hospital.component.scss"]
})
export class HospitalComponent implements OnInit {
  metiers = new Array<Metier>();
  constructor(private metierService: MetierService) { }

  @ViewChild(FormHopitalComponent)
  FormHopitalComponent: FormHopitalComponent;

  data: Hospital;
  @Input() role;
  @Input() projet;
  ngOnInit() {
    this.metierService.getMetiers().subscribe((data: Metier[]) => {
      this.metiers = data;
    });
  }

  update($event) {
    this.data = $event;
  }
  selectHopital($event) {
    this.FormHopitalComponent.createForm($event);
    this.projet = $event
  }
}

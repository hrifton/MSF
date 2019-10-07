import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Hospital } from "src/app/Class/Hospital";
import { MetierService } from "src/app/Service/metier.service";
import { Metier } from "src/app/Class/Metier";

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styleUrls: ["./hospital.component.scss"]
})
export class HospitalComponent implements OnInit {
  metiers = new Array<Metier>();
  constructor(private metierService: MetierService) {}

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
}

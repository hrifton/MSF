import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-metier-hopital",
  templateUrl: "./metier-hopital.component.html",
  styleUrls: ["./metier-hopital.component.scss"]
})
export class MetierHopitalComponent implements OnInit {
  @Input() metiers;
  @Input() projet;
  constructor() {
    console.log("constructor : ", this.projet);
    
  }

  ngOnInit() {
    console.log("ngOnInit: ", this.projet);
    console.log(this.metiers);
  }
}

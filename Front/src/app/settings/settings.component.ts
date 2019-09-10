import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MetierService } from '../Service/metier.service';
import Metier from '../setting/corpsDeMetier/Metier';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(private ms: MetierService) {}

  public metier: Metier[];

  ngOnInit() {
    this.metier = [];
    this.ms.getMetiers().subscribe((data: Metier[]) => {
      this.metier = data;
    });
  }
  public headerText: Object = [
    { text: "Project" },
    { text: "Hospital" },
    { text: "Maintenance" },
    { text: "Assets" },
    
   
  ];
}

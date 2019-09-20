import {
  Component,
  ViewEncapsulation,
  Inject,
  OnInit,
  ViewChild
} from "@angular/core";
import { MetierService } from "../Service/metier.service";
import Metier from "../setting/corpsDeMetier/Metier";
import { Hospital } from "../Class/Hospital";
import { HopitalService } from "../Service/hopital.service";
import { UserComponent } from "../user/user.component";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  @ViewChild(UserComponent)
  user: UserComponent;

  constructor(private ms: MetierService, private hs: HopitalService) {}

  public metier: Metier[];
  public headerText: Object = [
    { text: "Users" },
    { text: "Hospital" },
    { text: "Maintenance" },
    { text: "Assets" }
  ];
  public projet: Hospital[];

  ngOnInit() {
    this.metier = [];
    this.ms.getMetiers().subscribe((data: Metier[]) => {
      this.metier = data;
    });
    this.hs.getHospital().subscribe((data: Hospital[]) => {
      this.projet = data;
      console.log(this.projet);
    });
  }
}

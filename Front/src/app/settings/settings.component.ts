import { Component, OnInit, ViewChild } from "@angular/core";
import { Hospital } from "../Class/Hospital";
import { HopitalService } from "../Service/hopital.service";
import { UserComponent } from "../user/user.component";
import { UserService } from "../Service/user.service";
import { User } from "../Class/user";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  @ViewChild(UserComponent)
  user: UserComponent;
  role: string;
  hoptial: Hospital;
  constructor(private us: UserService, private hs: HopitalService) {}
  public headerText: Object = [
    { text: "Users" },
    { text: "Hospital" },
    { text: "Maintenance" },
    { text: "Trade/Categories" },
    { text: "Assets" }
  ];
  public projet: Hospital[];

  ngOnInit() {
    this.role = this.us.getStatus();
    this.checkStatut(this.role);
  }
  update($event) {
    this.us.postUser($event).subscribe((user: User) => {
      console.log(user);
    });
  }
  checkStatut(statut) {
    if (statut !== "SuperAdmin") {
      this.hs
        .findHopital(this.us.getIdHopital())
        .subscribe((data: Hospital[]) => {
          this.projet = data;
          console.log( "hopital : ",this.projet);
        });
    } else {
      this.hs.getHospital().subscribe((data: Hospital[]) => {
        this.projet = data;
        console.log(this.projet);
      });
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Hospital } from '../Class/Hospital';
import { HopitalService } from '../Service/hopital.service';
import { UserComponent } from '../user/user.component';
import { UserService } from '../Service/user.service';
import { User } from '../Class/user';
import { Metier } from '../Class/Metier';
import { MetierService } from '../Service/metier.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild(UserComponent)
  user: UserComponent;
  role: string;
  hoptial: Hospital;
  metiers: Metier[];
  flagAddListMetier: boolean = false;
  lastMetier: Hospital;

  constructor(private ms: MetierService, private us: UserService, private hs: HopitalService) { }
  public headerText: Object = [
    { text: 'Users' },
    { text: 'Hospital' },
    { text: 'Maintenance' },
    { text: 'Categories/Sub-Categories' },
    { text: 'Assets' }
  ];
  public projet: Hospital[];

  ngOnInit() {
    this.role = this.us.getStatus();
    this.checkStatut(this.role);
    this.ms.getMetiers().subscribe((data: Metier[]) => {
      this.metiers = data;
    });
  }
  update($event) {
    this.us.postUser($event).subscribe((user: User) => {
      console.log(user);
    });
  }
  checkStatut(statut) {
    if (statut !== 'SuperAdmin') {
      this.hs
        .findHopital(this.us.getIdHopital())
        .subscribe((data: Hospital[]) => {
          this.projet = data;
        });
    } else {
      this.hs.getHospital().subscribe((data: Hospital[]) => {
        this.projet = data;
      });
    }
  }
  addMetier($event) {
    console.log($event);
    this.hs.addMetier($event).subscribe((data: Hospital) => {
      this.lastMetier=data
    });
  }

  rmMetier($event) {
    console.log($event);
    this.hs.rmMetier($event).subscribe((data: Hospital) => {
      console.log(data);
    });
  }
  rmSubCat($event) {
    console.log($event)
    /*this.hs.rmSub($event).subscribe((data: Hopital) => {
      console.log(data)
    })*/
  }
  addSubToHopital($event) {
    this.hs.addSubCatToHop($event).subscribe((data: Hospital) => {
      console.log(data)
    });
  }


}

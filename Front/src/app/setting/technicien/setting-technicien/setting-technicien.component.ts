import { Component, OnInit } from '@angular/core';
//import { MetierService } from '../technicien.service';

@Component({
  selector: 'app-setting-technicien',
  templateUrl: './setting-technicien.component.html',
  styleUrls: ['./setting-technicien.component.css']
})
export class SettingTechnicienComponent implements OnInit {
  metiers: string[] = ['plombier', ' chauffagiste', 'électricien'];
  constructor() { }

  ngOnInit() {
		this.metiers;

  }



}

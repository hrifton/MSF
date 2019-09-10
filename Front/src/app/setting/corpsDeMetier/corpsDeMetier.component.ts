
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Metier from './Metier';
import { ListeCorpMetierComponent } from './liste-corpMetier/liste-corpMetier.component';
import { MetierService } from 'src/app/Service/metier.service';


@Component({
  selector: 'app-corpsDeMetier',
  templateUrl: './corpsDeMetier.component.html',
  styleUrls: ['./corpsDeMetier.component.css']
})
export class CorpsDeMetierComponent implements OnInit {
public metiers: Metier[];


  constructor(private ms: MetierService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.ms.getMetiers().subscribe((data: Metier[]) => {
      this.metiers = data;
      console.log(this.metiers);

    });

  }

}

import { Component, OnInit } from '@angular/core';
import { MetierService } from '../../Service/metier.service';
import { Metier } from 'src/app/Class/Metier';


@Component({
  selector: 'app-metiers',
  templateUrl: './metiers.component.html',
  styleUrls: ['./metiers.component.scss']
})
export class MetiersComponent implements OnInit {
  constructor(private ms: MetierService) {}
  public metiers: Metier[];
  ngOnInit() {
    this.ms.getMetiers().subscribe((data: Metier[]) => {
      this.metiers = data;
      console.log(this.metiers);
    });
  }
}

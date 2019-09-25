import { Component, OnInit } from '@angular/core';
import { MetierService } from '../../Service/metier.service';
import { Metier } from 'src/app/Class/Metier';
import { Categorie } from 'src/app/Class/Categorie';
import { CategorieService } from 'src/app/Service/categorie.service';


@Component({
  selector: 'app-metiers',
  templateUrl: './metiers.component.html',
  styleUrls: ['./metiers.component.scss']
})
export class MetiersComponent implements OnInit {
  constructor(private ms: MetierService, private cs: CategorieService) {}
  public metiers: Metier[];
  public selectcategorie: any;
  private flag: boolean;

  ngOnInit() {
    this.flag = false;
    this.ms.getMetiers().subscribe((data: Metier[]) => {
      this.metiers = data;
      this.cs.getCategorieByMetier(data[0]);
      this.flag = true;
    });
  }
  /**
   *
   * @param {Metier} data
   * @memberof MetiersComponent
   * Get data To Service Metier For Save
   */
  saveMetier(data: Metier) {
  console.log(data);
  this.ms.addMetier(data).subscribe((metier: Metier) =>
  console.log(metier));
  }
}

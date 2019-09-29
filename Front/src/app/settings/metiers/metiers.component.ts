import { Component, OnInit, ViewChild } from '@angular/core';
import { MetierService } from '../../Service/metier.service';
import { Metier } from 'src/app/Class/Metier';
import { Categorie } from 'src/app/Class/Categorie';
import { CategorieService } from 'src/app/Service/categorie.service';
import { ListMetiersComponent } from './list-metiers/list-metiers.component';


@Component({
  selector: 'app-metiers',
  templateUrl: './metiers.component.html',
  styleUrls: ['./metiers.component.scss']
})
export class MetiersComponent implements OnInit {
  public metiers: Metier[];
  public selectcategorie: any;
  private flag: boolean;

  @ViewChild(ListMetiersComponent)
  listMetiersComponent: ListMetiersComponent;

  constructor(private ms: MetierService, private cs: CategorieService) {}

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
    this.ms.addMetier(data).subscribe((metier: Metier) => {
      this.metiers.unshift(metier);
      console.log(this.metiers.length);
      this.listMetiersComponent.refresh();
    });
  }

  deleteMetier(data: Metier) {
    console.log('data to MetierService for delete : ', data);
  }


}

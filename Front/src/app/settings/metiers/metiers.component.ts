import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MetierService } from "../../Service/metier.service";
import { Metier } from "src/app/Class/Metier";
import { Categorie } from "src/app/Class/Categorie";
import { CategorieService } from "src/app/Service/categorie.service";
import { ListMetiersComponent } from "./list-metiers/list-metiers.component";
import { ListCategorieComponent } from './list-categorie/list-categorie.component';

@Component({
  selector: "app-metiers",
  templateUrl: "./metiers.component.html",
  styleUrls: ["./metiers.component.scss"]
})
export class MetiersComponent implements OnInit {
  @Input() projet;
  public metiers: Metier;
  public selectcategorie: Categorie[];
  public metierSelect: Metier;
  public flag: boolean;
  public listCat: Categorie[];
  @ViewChild(ListMetiersComponent)
  listMetiersComponent: ListMetiersComponent;
  @ViewChild(ListCategorieComponent)
  ListCategorieComponent: ListCategorieComponent;


  constructor(private ms: MetierService, private cs: CategorieService) { }

  async ngOnInit() {
    this.flag = false;
    this.metiers = await this.ms.getMetiers();
    this.metiers ? this.flag = true : this.flag = false;
  }
  /**
   *
   * @param {Metier} data
   * @memberof MetiersComponent
   * Get data To Service Metier For Save
   */
  async saveMetier(data: Metier) {
    console.log(this.metiers, 'il y a un unshift normalement')
    //this.metiers.unshift(await this.ms.addMetier(data))
    this.listMetiersComponent.refresh();

  }
  saveCategorie(data: Categorie) {
    console.log(data, 'saveCategorie');
    this.cs.AddCategorie(data).subscribe((categorie: any) => {
      this.metierSelect.categorie.push(categorie);
      this.ListCategorieComponent.grid.refresh();
    });
  }

  deleteMetier(data: Metier) {
    console.log("data to MetierService for delete : ", data);
  }
  selectMetier(data: Metier) {
    this.metierSelect = null;
    this.metierSelect = data;

  }
}

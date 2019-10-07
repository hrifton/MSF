import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MetierService } from "../../Service/metier.service";
import { Metier } from "src/app/Class/Metier";
import { Categorie } from "src/app/Class/Categorie";
import { CategorieService } from "src/app/Service/categorie.service";
import { ListMetiersComponent } from "./list-metiers/list-metiers.component";

@Component({
  selector: "app-metiers",
  templateUrl: "./metiers.component.html",
  styleUrls: ["./metiers.component.scss"]
})
export class MetiersComponent implements OnInit {
  @Input() projet;
  public metiers: Metier[];
  public selectcategorie: Categorie[];
  public metierSelect: Metier;
  public flag: boolean;

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
      console.log(this.metiers);
      this.listMetiersComponent.refresh();
    });
  }
  saveCategorie(data: Categorie) {
    console.log("Componenet metier save cate :", data);
  }

  deleteMetier(data: Metier) {
    console.log("data to MetierService for delete : ", data);
  }
  selectMetier(data: Metier) {
    this.metierSelect = data;
  }
}

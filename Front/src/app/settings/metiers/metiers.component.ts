import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MetierService } from "../../Service/metier.service";
import { Metier } from "src/app/Class/Metier";
import { Categorie } from "src/app/Class/Categorie";
import { CategorieService } from "src/app/Service/categorie.service";
import { ListMetiersComponent } from "./list-metiers/list-metiers.component";
import { ListCategorieComponent } from "./list-categorie/list-categorie.component";
import * as _ from "lodash";
@Component({
  selector: "app-metiers",
  templateUrl: "./metiers.component.html",
  styleUrls: ["./metiers.component.scss"]
})
export class MetiersComponent implements OnInit {
  @Input() projet;
  @Input() role;
  public metiers: Metier;
  public selectcategorie: Categorie[];
  public metierSelect: Metier;
  public flag: boolean;
  public listCat: Categorie[];
  @ViewChild(ListMetiersComponent)
  listMetiersComponent: ListMetiersComponent;
  @ViewChild(ListCategorieComponent)
  ListCategorieComponent: ListCategorieComponent;
  itemToolBar: any;

  constructor(private ms: MetierService, private cs: CategorieService) {}

  ngOnInit() {
    if (this.role == "Admin") {
      this.itemToolBar = null;
    } else if ((this.role = "SuperAdmin")) {
      this.itemToolBar = ["Delete"];
    }
    this.flag = false;
    this.ms.getMetiers().subscribe((data: Metier) => {
      this.metiers = data;
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
    console.log("ici")
    this.ms.addMetier(data).subscribe((data: Metier) => {
      if(data!=null){
         this.metiers = _.concat(this.metiers, data)
      console.log(this.metiers)
      this.listMetiersComponent.grid.refresh()
      console.log("finish Metier")
      }else{
        alert("La catégorie existe deja ou la couleur Choisi est deja utisé")
      }
     
    });
  }

  refresListeMetier(){
    this.listMetiersComponent.refresh();
  }
  saveCategorie(data: any) {
    let sub:any={name:data.subCat}
    this.cs.AddCategorie(data).subscribe((categorie: any) => {
      if(categorie.nModified==1){
       
         this.metierSelect.categorie.push(sub);

         console.log(this.metierSelect.categorie)
      this.ListCategorieComponent.grid.refresh();
      }else{
        alert("sub/categorie non rajouté "+ data)
      }
     
    });
  }

  deleteMetier(data: any) {
   this.ms.deleteMetier(data).subscribe((data:any)=>{
     console.log(data,this.metiers)
     let index = _.findIndex(this.metiers, function(o) {
       return o._id == data._id;
     });
     let tmp:any=this.metiers
     tmp.splice(index,1)
     this.metiers=tmp;

   })
  }
  selectMetier(data: Metier) {
    this.metierSelect = null;
    this.metierSelect = data;
  }
  delSubCatStandar($event) {
    this.cs.delSubCat($event).subscribe((data: any) => {
      console.log(data);
    });
  }
}

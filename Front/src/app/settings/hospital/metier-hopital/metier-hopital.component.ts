import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { RowDDService, SelectionService, GridComponent } from "@syncfusion/ej2-angular-grids";
import { Metier } from "src/app/Class/Metier";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import { Categorie } from "src/app/Class/Categorie";
import * as _ from "lodash";
@Component({
  selector: "app-metier-hopital",
  templateUrl: "./metier-hopital.component.html",
  styleUrls: ["./metier-hopital.component.scss"],
  providers: [RowDDService, SelectionService]
})
export class MetierHopitalComponent implements OnInit {
  //#region
  @Input() metiers;
  @Input() projet;
  @Input() projetMetier;

  @Output() messageEvent = new EventEmitter<Metier>();
  @Output() rmMetier = new EventEmitter<Metier>();
  @Output() addSubCat = new EventEmitter<Categorie>();
  @Output() rmSubCat = new EventEmitter<Categorie>();

  public metierSelect: any;
  public metierToHospital: any[];
  public categorieToHospital: any[];
  public srcData: Object[] = [];
  public pageOptions: Object;
  public selectionOptions: Object;
  public srcDropOptions: Object;
  public destDropOptions: Object;
  public idx: any;
  public dta: any;
  public flag = false;
  public rmFlag = false;
  public sizeMetierToHospital = 0;
  public sizeMetiers = 0;
  public subCat: any;
  public flagAddSubCat: boolean;
  public flagRmSubCat: boolean;
  public SubCatSelect: any[];
  public constMetiers: any[];
  subCatToHospital: any;
  flagShowSubCat: boolean;
  subRm: any;
  constructor(public fb: FormBuilder) { }
  public categorieForm: FormGroup;
  public myClonedArray: any[];
  public listeMetier: any[];
  @ViewChild('grid') public DestGrid2: GridComponent;
  //#endregion

  ngOnInit() {
    console.log(this.projetMetier, this.projet)
    this.flagShowSubCat = false
    this.SubCatSelect = [];
    this.constMetiers = this.metiers;
    this.metierToHospital = this.projet[0].metier;
    this.filtreTableMetier();

    this.selectionOptions = { type: "Multiple" };
    this.srcDropOptions = { targetID: "DestGrid" };
    this.destDropOptions = { targetID: "Grid" };
  }

  //#region Categorie
  /**
   *
   * @param args
   * if rmFlag true remove element to array => db
   * if Flag true add element to array => db
   */
  rowDrop(args: any) {
    this.idx = args.fromIndex;
    this.dta = args.data;

    if (this.rmFlag) {
      this.dta.idHopital = this.projetMetier._id
      this.rmMetier.emit(this.dta);
      this.rmFlag = false;
    } else if (this.flag) {
      this.dta.idHopital = this.projetMetier._id
      this.messageEvent.emit(this.dta);
      this.flag = false;
    }
  }
  // si deplacement element du tableau de gauche vers tableau de droit  flag passe a true pour ajouter element des catégorie de l'hopital
  rowDragStart(args: any) {
    this.flag = true;
  }
  // si deplacement element du tableau de droite vers tableau de gauche  flag passe a true pour retire element des catégorie de l'hopital
  rmRowDragStart(args: any) {
    this.sizeMetierToHospital = this.metierToHospital.length;
    console.log(this.metierToHospital.length);
    this.rmFlag = true;
  }
  // compare les deux tableaux pour ne pas avoir de doublon
  filtreTableMetier() {
    const tmpArrayMetier = [];
    this.constMetiers.forEach(elementConstMetier => {
      /**
       * check dans le tableau metierToHospital si element_id existe returne true ou false
       */
      console.log(elementConstMetier)
      const found = this.metierToHospital.find(function (element) {
        return element._id == elementConstMetier._id;
      });

      // si return false le metier n'est pas assigne a l'hopital alors stocke
      // sinon il est stock dans la liste des metier assigné a l'hopital
      if (!found) {
        tmpArrayMetier.push(elementConstMetier);
      } else {
        this.SubCatSelect == undefined
          ? (this.SubCatSelect = elementConstMetier)
          : this.SubCatSelect.push(elementConstMetier);
        
      }
    });
    // reinitialisation des metier non assigne a l'hopital
    
    this.constMetiers = tmpArrayMetier;
  }
  /**
   *
   * @param $event
   * Metier selectionner transfere vers list sub-Categorie
   * Verification Liste SubCat standart & subCatHopital
   */
  rowSelected($event) {
    console.log($event.data.categorie2==undefined)
   
   if(Object.keys($event.data).length==4){
        this.subCat = $event.data;
    this.subCatToHospital = this.metierToHospital;
   
    const name = this.subCat.name;
  
    const index = _.findIndex(this.metiers, function (o) {
      return o.name === name;
    });
   
    this.subCat = this.metiers[index];
    this.subCatToHospital.categorie = $event.data.categorie;

   
    // si le tableau des subCat n'est pas vide
    if (this.subCatToHospital.categorie) {

      const tmp = [];
      // this.subCatToHospital = $event.data;
      this.subCat.categorie.forEach(element1 => {

        const found = this.subCatToHospital.categorie.find(function (element) {

          return element._id == element1._id;
        });

        if (!found) {
          tmp.push(element1);
        }
      });


      this.subCat.categorie2 = tmp;
    }
   }else{
     this.subCat.categorie2 = $event.data.categorie;
     this.subCatToHospital.categorie==null
   }
    

    this.createFormCat(this.subCat);
    this.flagShowSubCat = true;

  }

  //#endregion
  //#region SubCategorie
  createFormCat(data) {
    this.categorieForm = this.fb.group({
      idHopital: new FormControl(this.projetMetier._id, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      idMetier: new FormControl(data._id, [Validators.required]),
      color: new FormControl("", [Validators.required])
    });
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // this.createFormCat(changes.metierSelect.currentValue);
  }*/
  subRowDragStart($event) {
    this.flagAddSubCat = true;
  }
  subRmRowDrag($event) {
    this.flagRmSubCat = true;
    //this.subRm = $event.data[0];

  }

  subRowDrop(args: any) {

    if (this.flagAddSubCat) {
      let addSubCat = new Categorie(args.data[0].name, args.data[0].color, this.projetMetier._id, this.subCat._id, args.data[0]._id);
      this.addSubCat.emit(addSubCat);
      this.flagAddSubCat = false;
    } else if (this.flagRmSubCat) {
      let rmSubCat = new Categorie(args.data[0].name, args.data[0].color, this.projetMetier._id, this.subCat._id, args.data[0].id);
      this.rmSubCat.emit(rmSubCat);
      this.flagRmSubCat = false;
    }
  }

  saveSub(data) {
    this.addSubCat.emit(data.value);
    this.subCatToHospital.categorie.unshift(data.value)
    this.DestGrid2.refresh();
  }
  //#endregion
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes.projetMetier.currentValue)
    if (changes.projetMetier.currentValue.departements) {
      this.flagShowSubCat = false
      this.metierToHospital = changes.projetMetier.currentValue.metier
      this.constMetiers = this.metiers
      //this.subCatToHospital.categorie = changes.projetMetier.currentValue.metier
      this.filtreTableMetier();

    }
  }

  rowSelectedSub($event) {
    console.log($event)
  }

  refreshDestGrid() {
    this.DestGrid2.refresh()
  }
}

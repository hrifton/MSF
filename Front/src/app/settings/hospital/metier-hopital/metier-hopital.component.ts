import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import {
  RowDDService,
  SelectionService,
  GridComponent
} from "@syncfusion/ej2-angular-grids";
import { Metier } from "src/app/Class/Metier";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import { Categorie } from "src/app/Class/Categorie";
import * as _ from "lodash";
import { concat } from "rxjs";
/**
 *
 *
 * @export
 * @class MetierHopitalComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-metier-hopital",
  templateUrl: "./metier-hopital.component.html",
  //styleUrls: ["./metier-hopital.component.css"],
  providers: [RowDDService, SelectionService]
})
export class MetierHopitalComponent implements OnInit {
  //#region
  @Input() metiers;
  @Input() projet;
  @Input() projetMetier;

  @Output() messageEvent = new EventEmitter<Metier>();
  @Output() rmMetier = new EventEmitter<Metier>();
  @Output() addSubCat = new EventEmitter<any>();
  @Output() rmSubCat = new EventEmitter<any>();

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
  listeSubCatStandar: any;
  nameCategorie: any;
  _idCat: any;
  constructor(public fb: FormBuilder) { }
  public categorieForm: FormGroup;
  public myClonedArray: any[];
  public listeMetier: any[];
  @ViewChild("grid") public grid: GridComponent;
  @ViewChild("grid1") public DestGrid: GridComponent;
  @ViewChild("grid2") public grid2: GridComponent;
  @ViewChild("grid3") public DestGrid2: GridComponent;
  //#endregion

  ngOnInit() {
    console.log(this.projetMetier, this.projet, this.metiers);
    this.flagShowSubCat = false;
    this.SubCatSelect = [];
    this.constMetiers = this.metiers.slice();
    this.metierToHospital = this.projetMetier.metier.slice();
    this.filtreTableMetier();

    this.selectionOptions = { type: "Multiple" };
    this.srcDropOptions = { targetID: "DestGrid2" };
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
    console.log(args);
    console.log("addMetier", this.metierToHospital);
    this.dta = args.data;

    if (this.rmFlag) {
      console.log("remove", this.constMetiers, this.metierToHospital)
      this.dta.idHopital = this.projetMetier._id;
      console.log("RmFlag ", this.dta);
      this.rmMetier.emit(this.dta);
      this.rmFlag = false;
      this.listeSubCatStandar = [];
      this.subCatToHospital = [];
      console.log("remove", this.constMetiers, this.metierToHospital);
    } else if (this.flag) {
      console.log("Add", this.constMetiers, this.metierToHospital);
      this.metierToHospital.push(this.dta[0]);
      console.log("Add", this.constMetiers, this.metierToHospital);
      this.dta.idHopital = this.projetMetier._id;
      this.messageEvent.emit(this.dta);
      this.DestGrid.refresh()
      // this.flag = false;
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
      const found = this.metierToHospital.find(function (element) {
        console.log(element, elementConstMetier);
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
    this.nameCategorie = $event.data.name;
    this._idCat = $event.data._id;
    //recupere la liste des subCat standar
    this.listeSubCatStandar = this.getListeSubcat(
      $event.data.name,
      this.metiers
    );
    //recupere la liste des subCat present dans l'hopital
    if (this.projetMetier.metier.length > 0) {
      console.log("relance");
      this.subCatToHospital = this.getListeSubcat(
        $event.data.name,
        this.projetMetier.metier.slice()
      );
    } else {
      this.subCatToHospital = [];
    }

    this.comparaisonListeSubCat();

    this.createFormCat(this._idCat);
    this.flagShowSubCat = true;
  }

  //#endregion
  //#region SubCategorie
  createFormCat(data) {
    console.log(data);
    this.categorieForm = this.fb.group({
      idHopital: new FormControl(this.projetMetier._id, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      idCat: new FormControl(data, [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // this.createFormCat(changes.metierSelect.currentValue);
  }
  subRowDragStart($event) {
    this.flagAddSubCat = true;
  }
  subRmRowDrag($event) {
    this.flagRmSubCat = true;
    //this.subRm = $event.data[0];
  }

  subRowDrop(args: any) {
    console.log(args, this.projetMetier._id);
    if (this.flagAddSubCat) {
      console.log("addSub ", args.data[0]);
      let addSubCat = {
        name: args.data[0].name,
        idCat: this._idCat,
        idHopital: this.projetMetier._id
      };
      _.remove(this.listeSubCatStandar, function (n) {
        return n.name == addSubCat.name;
      });
      this.comparaisonListeSubCat();

      console.log(this.subCatToHospital);
      this.addSubCat.emit(addSubCat);
      this.flagAddSubCat = false;
    } else if (this.flagRmSubCat) {
      console.log("RmSub ", args.data[0]);
      let rmSubCat = {
        name: args.data[0].name,
        idCat: this._idCat,
        idHopital: this.projetMetier._id
      };
      console.log(this.listeSubCatStandar);
      _.remove(this.subCatToHospital, function (n) {
        return n.name == rmSubCat.name;
      });
      this.comparaisonListeSubCat();
      let name = { name: rmSubCat.name };
      let find = _.findIndex(this.listeSubCatStandar, function (o) {
        return o.name == name.name;
      });
      console.log(find);
      this.listeSubCatStandar.unshift(name);
      console.log(this.listeSubCatStandar);
      this.rmSubCat.emit(rmSubCat);
      this.flagRmSubCat = false;
      this.DestGrid2.refresh();
    }
    //this.refreshDestGrid();
  }

  saveSub(data) {
    let result = _.findIndex(this.subCatToHospital, function (o) {
      return o.name == data.value.name;
    });
    if (result == -1) {
      this.subCatToHospital.unshift({ name: data.value.name });
      this.addSubCat.emit(data.value);
    }

    this.DestGrid2.refresh();
  }
  //#endregion

  rowSelectedSub($event) {
    console.log($event);
  }

  refreshDestGrid() {
    console.log(this.listeSubCatStandar, this.subCatToHospital);

    // this.grid.refresh();
    this.grid2.refresh();
    // this.DestGrid.refresh();
    this.DestGrid2.refresh();
  }
  /**
   * Return Liste des subCat d'un metier
   */
  getListeSubcat(name: any, metier: any) {
    console.log(name, metier);
    const index = _.findIndex(metier, function (o) {
      return o.name == name;
    });
    if (metier[index] != undefined) {
      if (metier[index].categorie != undefined) {
        return metier[index].categorie;
      }
    }
  }
  /**
   *supprimer doublon
   *
   * @memberof MetierHopitalComponent
   */
  comparaisonListeSubCat() {
    let tmp = [];
    this.listeSubCatStandar.forEach(element => {
      let index = _.findIndex(this.subCatToHospital, function (o) {
        return o.name == element.name;
      });
      if (index == -1) {
        tmp.push(element);
      }
      this.listeSubCatStandar = tmp;
    });
  }
}

import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RowDDService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { Metier } from 'src/app/Class/Metier';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Categorie } from 'src/app/Class/Categorie';
import * as _ from 'lodash';
@Component({
  selector: 'app-metier-hopital',
  templateUrl: './metier-hopital.component.html',
  styleUrls: ['./metier-hopital.component.scss'],
  providers: [RowDDService, SelectionService]
})
export class MetierHopitalComponent implements OnInit {
  //#region
  @Input() metiers;
  @Input() projet;
  @Output() messageEvent = new EventEmitter<Metier>();
  @Output() rmMetier = new EventEmitter<Metier>();
  @Output() addSubCat = new EventEmitter<Categorie>();
  @Output() rmSubCat = new EventEmitter<Categorie>();

  private metierSelect: any;
  private metierToHospital: any[];
  private categorieToHospital: any[];
  private srcData: Object[] = [];
  private pageOptions: Object;
  private selectionOptions: Object;
  private srcDropOptions: Object;
  private destDropOptions: Object;
  private idx: any;
  private dta: any;
  private flag = false;
  private rmFlag = false;
  private sizeMetierToHospital = 0;
  private sizeMetiers = 0;
  private subCat: any;
  private flagAddSubCat: boolean;
  private flagRmSubCat: boolean;
  private SubCatSelect: any[];
  private constMetiers: any[];
  subCatToHospital: any;
  constructor(private fb: FormBuilder) { }
  public categorieForm: FormGroup;
  private myClonedArray: any[];
  //#endregion

  ngOnInit() {
    this.SubCatSelect = [];
    this.constMetiers = this.metiers;
    this.metierToHospital = this.projet[0].metier;
    this.filtreTableMetier();

    this.selectionOptions = { type: 'Multiple' };
    this.srcDropOptions = { targetID: 'DestGrid' };
    this.destDropOptions = { targetID: 'Grid' };
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
      this.rmMetier.emit(this.dta);
      this.rmFlag = false;
    } else if (this.flag) {
      if (this.metierToHospital.length <= 0) {
        // this.metierToHospital = this.dta
      }

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
      let found = this.metierToHospital.find(function (element) {
        return element._id == elementConstMetier._id;
      });

      // si return false le metier n'est pas assigne a l'hopital alors stocke
      // sinon il est stock dans la liste des metier assigné a l'hopital
      if (!found) {
        tmpArrayMetier.push(elementConstMetier);
      } else {
        this.SubCatSelect.push(elementConstMetier);
      }
    });
    // reinitialisation des metier non assigne a l'hopital
    this.constMetiers = tmpArrayMetier;

  }
  /**
   *
   * @param $event
   * Metier selectionner transfere vers list sub-Categorie
   */
  rowSelected($event) {

    this.subCat = $event.data;
    this.subCatToHospital = this.metierToHospital;

    const name = this.subCat.name;
    const index = _.findIndex(this.metiers, function (o) { return o.name === name; });

    this.subCat = this.metiers[index];
    console.log(this.subCat, this.subCatToHospital)
    // si le tableau des subCat n'est pas vide
    if (this.subCatToHospital.categorie != undefined) {
      const tmp = [];
      // this.subCatToHospital = $event.data;
      this.subCat.categorie.forEach(element1 => {
        let found = this.subCatToHospital.categorie.find(function (element) {

          return element.id == element1._id;
        });

        if (!found) {
          tmp.push(element1);
        }

      });
      this.subCat.categorie = tmp;
    }

    // TODO faire le trie pour ne plus avoir de doublon
    this.createFormCat(this.subCat);
  }

  //#endregion
  //#region SubCategorie
  createFormCat(data) {
    this.categorieForm = this.fb.group({
      categorie: new FormControl('', [Validators.required]),
      idMetier: new FormControl(data._id, [Validators.required]),
      color: new FormControl('', [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // this.createFormCat(changes.metierSelect.currentValue);
  }
  subRowDragStart($event) {
    this.flagAddSubCat = true;
    console.log('subRowDragStart :', $event);
  }
  subRmRowDrag($event) {
    this.flagRmSubCat = true;
    console.log('subRmRowDragStart :', $event);
  }

  subRowDrop(args: any) {
    this.idx = args.fromIndex;
    // this.subCat = args.data;
    // this.subCat.idMetier = this.metierSelect.id;
    const addSubCat = args.data[0];
    addSubCat.idHopital = this.projet[0]._id;
    addSubCat.idMetier = this.subCat._id;

    if (this.flagAddSubCat) {
      this.addSubCat.emit(addSubCat);
      this.flagAddSubCat = false;
    } else if (this.flagRmSubCat) {
      this.rmSubCat.emit(this.dta);
      this.flagRmSubCat = false;
    }
  }

  saveSub(data) {
    console.log(data.value);
    // this.messageEvent.emit(data.value);
  }
  //#endregion
}

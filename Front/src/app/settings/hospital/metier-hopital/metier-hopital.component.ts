import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RowDDService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { Metier } from 'src/app/Class/Metier';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Categorie } from 'src/app/Class/Categorie';
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
  @Input() lastMetier;
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
  constructor(private fb: FormBuilder) {}
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
      this.messageEvent.emit(this.dta);
      this.flag = false;
    }
  }
  // si deplacement element du tableau de gauche vers tableau de droit  flag passe a true pour ajouter element des catégorie de l'hopital
  rowDragStart(args: any) {
    this.sizeMetiers = this.metiers.length;

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
  /* for (let j = 0; j < this.constMetiers.length; j++) {
      for (let i = 0; i < this.metierToHospital.length; i++) {
        if (this.metierToHospital[i]._id === this.constMetiers[j]._id) {
          this.SubCatSelect.push(this.constMetiers[j]);
          this.constMetiers.splice(j, 1);
        }
      }
    }*/

this.constMetiers.forEach(elementConstMetier => {

  this.metierToHospital.forEach(elementMetierToHopital => {

    if (elementConstMetier._id === elementMetierToHopital._id) {
      this.SubCatSelect.push(elementConstMetier);
    }
  });
});
console.log(this.SubCatSelect);

  }
  testListe() {
    console.log(this.metiers);
  }
  /**
   *
   * @param $event
   * Metier selectionner transfere vers list sub-Categorie
   */
  rowSelected($event) {
    this.metierSelect = $event.data;
    this.SubCatSelect.forEach(element => {
  if (element._id === this.metierSelect._id) {
    this.subCat = element;
  }
});
const sizeSUBcatIdCat=this.subCat.idCategorie.length
    for (let i = 0; i <= sizeSUBcatIdCat; i++) {
      const element = this.subCat.idCategorie[i];
      console.log(element)
      for (let j = 0; j < this.metierSelect.categorie.length; j++) {
        const element2 = this.metierSelect.categorie[j];
        console.log(sizeSUBcatIdCat);
        if (element._id == element2._id) {
          this.subCat.idCategorie.splice(i, 1);
        }
      }
    }
    this.createFormCat(this.metierSelect);
  }

  //#endregion
  //#region SubCategorie
  createFormCat(data) {
    this.categorieForm = this.fb.group({
      categorie: new FormControl('', [Validators.required]),
      idMetier: new FormControl(data.id, [Validators.required]),
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
    this.subCat = args.data;
    this.subCat.idMetier = this.metierSelect._id;
    console.log(this.subCat);

    if (this.flagAddSubCat) {
      this.addSubCat.emit(this.subCat);
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

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import Departement from "src/app/Class/Departement";

import * as _ from "lodash";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: "app-departement-hopital",
  templateUrl: "./departement-hopital.component.html",
  styleUrls: ["./departement-hopital.component.scss"]
})
export class DepartementHopitalComponent implements OnInit {
  @Input() departements;
  @Input() projet;

  @Output() addDep = new EventEmitter<any>();
  @Output() delDep = new EventEmitter<any>();

  public srcData: any[] = [];
  public destData: any[] = [];
  public pageOptions: Object;
  public selectionOptions: Object;
  public srcDropOptions: Object;
  public destDropOptions: Object;
  public depAction: any;
  public flag = false;
  public flagRm = false;
  public initialPage: Object;
  public toolbar: string[];
  public departementForm: FormGroup;
  constructor(public fb: FormBuilder) {}
  @ViewChild("grid2") public DestGrid: GridComponent;
  ngOnInit() {
    this.createFormDepartement();
    this.destData = this.projet[0].departements;
    console.log(this.projet);
    this.srcData = this.filtreDepartement(
      this.departements.slice(),
      this.destData
    );
    this.pageOptions = { pageCount: 2 };
    this.selectionOptions = { type: "Multiple" };
    this.srcDropOptions = { targetID: "DestGrid" };
    this.destDropOptions = { targetID: "Grid" };
    this.initialPage = { pageSizes: true, pageCount: 1 };
    this.toolbar = ["Search"];
  }

  /**
   * compare listeDepartement with ListeDepInToHospital and remove double to listeDepartement
   *
   * @param {*} listDepartement
   * @param {*} listDepInToHospital
   * @returns listDepartement
   * @memberof DepartementHopitalComponent
   */
  filtreDepartement(listDepartement, listDepInToHospital) {
    listDepInToHospital.forEach(element => {
      const index = _.findIndex(listDepartement, function(o) {
        return o._id == element._id;
      });
      listDepartement.splice(index, 1);
    });
    return listDepartement;
  }

  rowDragStart(args: any) {
    this.flag = true;
    this.depAction = args.data;
  }
  rmRowDragStart(args: any) {
    this.flagRm = true;
    this.depAction = args.data;
  }

  actionBegin(args: any) {
    let idHopital;
    //check si un hopital est selectionner sinon prend le premiere hopital de la liste
    !this.projet._id
      ? (idHopital = this.projet[0]._id)
      : (idHopital = this.projet._id);
    if (this.flag) {
      console.log(args);
      this.depAction[0].idHopital = idHopital;
      this.addDep.emit(this.depAction);
    } else if (this.flagRm) {
      //delete departement in to hospital
      
      this.depAction[0].idHopital = idHopital;
      this.delDep.emit(this.depAction);
    }
    this.flagRm = false;
    this.flag = false;
  }
  /**
   *Execute if select Hospital in Liste-Hostpital
   *
   * @param {SimpleChanges} changes
   * @memberof DepartementHopitalComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.projet.previousValue != "undefined") {
      console.log(changes.projet);
      this.projet = changes.projet.currentValue;
      this.destData = changes.projet.currentValue.departements;
      this.srcData = this.filtreDepartement(
        this.departements.slice(),
        changes.projet.currentValue.departements
      );
    }
  }

  createFormDepartement() {
    this.departementForm = this.fb.group({
      departement: new FormControl("", [Validators.required])
    });
  }
/**
 *save Departement
 *
 * @param {*} data
 * @memberof DepartementHopitalComponent
 */
saveDep(data) {
   
    let idHopital;
//check si un hopital est selectionner sinon prend le premiere hopital de la liste
   !this.projet._id?idHopital=this.projet[0]._id:idHopital = this.projet._id;
    //preparation de l'objet a envoyer
   let departement = [
      { departement: data.value.departement, idHopital: idHopital }
    ]; 
//verifie que le departement a rajotuer n'est pâs deja dans la liste
    let result = _.findIndex(this.destData, function(o) {
      return o.departement == departement[0].departement;
    });
//si le departement n'est pas dans la liste on le rajoute 
    if (result == -1) {
      this.destData.unshift({departement:departement[0].departement});
      this.addDep.emit(departement);
      this.DestGrid.refresh();
      this.createFormDepartement()
    }
  }
}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import Departement from "src/app/Class/Departement";

import * as _ from "lodash";
@Component({
  selector: "app-departement-hopital",
  templateUrl: "./departement-hopital.component.html",
  styleUrls: ["./departement-hopital.component.scss"]
})
export class DepartementHopitalComponent implements OnInit {
  @Input() departements;
  @Input() projet;

  @Output() addDep = new EventEmitter<Departement>();
  @Output() delDep = new EventEmitter<Departement>();

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
  constructor() {}

  ngOnInit() {
    this.destData = this.projet[0].departements;

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
      if (this.flag) {
      this.addDep.emit(this.depAction);
    } else if(this.flagRm) {
      //delete departement in to hospital
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
      this.destData = changes.projet.currentValue.departements;
      this.srcData = this.filtreDepartement(
        this.departements.slice(),
        changes.projet.currentValue.departements
      );
    }
  }
}

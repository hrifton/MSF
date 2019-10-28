import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Departement from 'src/app/Class/Departement';

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
    this.srcData = this.departements;
    this.destData = this.projet[0].departements;
    this.filtreDepartement();
    this.pageOptions = { pageCount: 2 };
    this.selectionOptions = { type: "Multiple" };
    this.srcDropOptions = { targetID: "DestGrid" };
    this.destDropOptions = { targetID: "Grid" };
    this.initialPage = { pageSizes: true, pageCount: 1 };
    this.toolbar = ["Search"];
  }
  filtreDepartement() {
    console.log("Filtre");
    this.destData.forEach(element => {
      const index = _.findIndex(this.srcData, function(o) {
        return o._id == element._id;
      });
      this.srcData.splice(index, 1);
    });
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
      console.log(this.depAction);
      this.addDep.emit(this.depAction);
    } else {
      //delete departement in to hospital
      this.delDep.emit(this.depAction);
    }
    this.flagRm = false;
    this.flag = false;
  }
}

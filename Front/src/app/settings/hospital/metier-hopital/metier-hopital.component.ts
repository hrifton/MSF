import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { RowDDService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { Metier } from 'src/app/Class/Metier';
@Component({
  selector: "app-metier-hopital",
  templateUrl: "./metier-hopital.component.html",
  styleUrls: ["./metier-hopital.component.scss"],
  providers: [RowDDService,
    SelectionService]
})
export class MetierHopitalComponent implements OnInit {
  @Input() metiers;
  @Input() projet;
  @Output() messageEvent = new EventEmitter<Metier>();
  public metierToHospital: any[];
  public srcData: Object[] = [];
  public destData: Object[] = [];
  public pageOptions: Object;
  public selectionOptions: Object;
  public srcDropOptions: Object;
  public destDropOptions: Object;
  public idx: any;
  public dta: any;
  public flag: boolean = true;
  constructor() {
    console.log("constructor : ", this.projet);

  }

  ngOnInit() {
    console.log("ngOnInit: ", this.projet);
    console.log(this.metiers);
    this.selectionOptions = { type: 'Multiple' };
    this.srcDropOptions = { targetID: 'DestGrid' };
    this.destDropOptions = { targetID: 'Grid' };
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  actionBegin(args: any) {
    this.messageEvent.emit(this.dta);
  }
  supprime(args: any) {
    console.log(args)
  }
  rowDrop(args: any) {
    this.idx = args.fromIndex;
    this.dta = args.data;
    console.log(this.idx, this.dta)
  }

  rowDragStart(args: any) {
    this.flag = true;
  }
}

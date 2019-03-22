import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService, ToolbarService, PageService,SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataManager, ODataV4Adaptor,Query } from '@syncfusion/ej2-data';
import { DepartementService } from '../departement.service';
import Departement from '../Departement';


@Component({
  selector: 'app-liste-departement',
  templateUrl: './liste-departement.component.html',
  styleUrls: ['./liste-departement.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class ListeDepartementComponent implements OnInit {

  public departements: Departement[];
  public filterSettings: Object;
  public editSettings: Object;
  public toolbar: string[];
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public pageSettings: Object;
  public editparams: Object;
  public query: Query;
  public priorityrules: Object;
  public dropData: string[];



  constructor(private ds: DepartementService,route: ActivatedRoute,private router: Router) {

   }



  ngOnInit() {
    this.ds.getDepartements().subscribe((data: Departement[])=>{
      this.departements=data;
    });
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Edit', 'Delete'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules = { required: true };
        this.editparams = { params: { popupHeight: '100px' }};
        this.pageSettings = { pageCount: 5};
        this.dropData = ['Order Placed', 'Processing', 'Delivered'];
  }

}

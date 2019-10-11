import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@syncfusion/ej2-base';
import {
  EditService,
  ToolbarService,
  PageService,
  DialogEditEventArgs,
  SaveEventArgs,
  GridComponent,
  RowDataBoundEventArgs
} from '@syncfusion/ej2-angular-grids';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { SolutionService } from 'src/app/Service/solution.service';
import Intervention from 'src/app/Class/Intervention';

@Component({
  selector: 'app-list-intervention',
  templateUrl: './list-intervention.component.html',
  styleUrls: ['./list-intervention.component.css'],
  providers: [ToolbarService, EditService, PageService]
})
export class ListInterventionComponent implements OnInit {
  @Input() interventions;
  @Input() departements;
  @Input() metier;
  @Input() maintenance;
  @Input() techs;
  @Input() user;
  @Output() messageEvent = new EventEmitter<Intervention>();

  @ViewChild('grid') public grid: GridComponent;

  // public interventions: Intervention[];
  public priorities: { [key: string]: Object }[] = [
    { priority: 'High' },
    { priority: 'Medium' },
    { priority: 'Low' }
  ];
  public lStatus: { [key: string]: Object }[] = [
    { status: 'Open' },
    { status: 'Waiting' },
    { status: 'Canceled' },
    { status: 'Done' }
  ];
  public resolution: any[];
  today = new Date();
  public filterSettings: Object;
  public editSettings: Object;
  public toolbar: string[];
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public pageSettings: Object;
  public editparams: Object;
  public priorityrules: Object;
  public dropData: string[];
  public formatOptions;
  //
  public text = 'Select a Technicien';
  public angForm: FormGroup;
  public shipCityDistinctData: Object[];
  public shipCountryDistinctData: Object[];
  public submitClicked = false;
  // router: Router;

  constructor(private ss: SolutionService, private router: Router) { }

  ngOnInit() {
    this.filterSettings = {
      type: 'Menu'
    };

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog'
    };

    this.orderidrules = {
      required: true,
      number: true
    };
    this.customeridrules = {
      required: true
    };
    this.freightrules = {
      required: true
    };
    this.editparams = {
      params: {
        popupHeight: '100px'
      }
    };
    this.pageSettings = { pageSizes: true, pageSize: 8 };
    this.dropData = ['Order Placed', 'Processing', 'Delivered'];
  }
  sendLink(data) {
    this.router.navigate(['historic/'], { queryParams: { asset: data } });
  }
  /**
   * create formulaire en fonction des data present
   * @param data
   */
  createFormGroup(data): FormGroup {
    if (this.user === 'User') {
      return new FormGroup({
        _id: new FormControl(data._id, Validators.required),
        departement: new FormControl(
          data.departements[0]._id,
          Validators.required
        ),
        locality: new FormControl(data.locality ? data.locality : ''),
        priority: new FormControl(data.priority),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
        day: new FormControl(data.day),
        slug: new FormControl(data.slug)
      });
    } else if (this.user === 'Admin') {
      return new FormGroup({
        _id: new FormControl(data._id, Validators.required),
        departement: new FormControl(
          data.departements[0]._id,
          Validators.required
        ),
        locality: new FormControl(data.locality ? data.locality : ''),
        priority: new FormControl(data.priority),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
        type: new FormControl(data.type ? data.type : ''),
        day: new FormControl(data.day),
        tech: new FormControl(data.tech ? data.tech : ''),
        useMat: new FormControl(data.useMat ? data.useMat : ''),
        asset: new FormControl(data.asset ? data.asset : ''),
        slug: new FormControl(data.slug),
        metier: new FormControl(data.metier.length > 0 ? data.metier[0]._id : ''),
        solution: new FormControl(data.solution ? data.solution : '')
      });
    } else {
      return new FormGroup({
        _id: new FormControl(data._id, Validators.required),
        departement: new FormControl(
          data.departements[0]._id,
          Validators.required
        ),
        locality: new FormControl(data.locality),
        priority: new FormControl(data.priority),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
        type: new FormControl(data.type),
        day: new FormControl(data.day),
        tech: new FormControl(data.tech),
        useMat: new FormControl(data.useMat),
        asset: new FormControl(data.asset),
        slug: new FormControl(data.slug),
        metier: new FormControl(data.metier[0]._id),
        solution: new FormControl('')
      });
    }
  }
  public sortComparer = (reference: string, comparer: string) => {
    if (reference < comparer) {
      return -1;
    }
    if (reference > comparer) {
      return 1;
    }
    return 0;
  }

  dateValidator() {
    return (control: FormControl): null | Object => {
      return control.value &&
        control.value.getFullYear &&
        (1900 <= control.value.getFullYear() &&
          control.value.getFullYear() <= 2099)
        ? null
        : { OrderDate: { value: control.value } };
    };
  }
  // Action sur le tableau
  actionBegin(args: SaveEventArgs): void {
    // Verification de l'action debut edit ou ajout
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // this.submitClicked = false;
      // Creation du formulaire
      this.angForm = this.createFormGroup(args.rowData);
    }
    // Click SAVE
    if (args.requestType === 'save') {
      this.submitClicked = true;

      // verification si le formulaire est valid
      if (this.angForm.valid) {

        this.messageEvent.emit(this.angForm.value);

      } else {
        console.log("error")
        args.cancel = true;
      }
    }
  }
  /**
   * @param data   *
   * return historique des solution
   */
  historique(data) {
    this.ss.getSolutionByIdIntervention(data);
  }
  /**
   *
   * @param args
   * determine l'action executer sur le tableau
   */
  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 500 + 'px';
        (args.dialog as Dialog).dataBind();
      }
    }
  }

  ngOnChanges(): void {
    // console.log("ListIntervention changed", this.grid);
    // console.log(changes);
    // this.grid.refresh();
  }
  /**
   * refresh tableau liste intervention
   */
  refreshInterventionTable() {
    this.grid.refresh();
  }

  // Couleur par etat de ligne  https://stackblitz.com/edit/angular-9tucrb?file=app.component.ts
  rowDataBound(args: RowDataBoundEventArgs) {

    if (args.data['status'] === "Done") {
      args.row.classList.add('Done');
    } else if (args.data['status'] === "Waiting") {
      args.row.classList.add('Waiting');
    } else if (args.data['status'] === "Open") {
      if (args.data['tech'] === undefined && args.data['metier.0.name'] === undefined) {
        args.row.classList.add('attribution');
      } else {
        args.row.classList.add('Open');
      }

    }




  }
}

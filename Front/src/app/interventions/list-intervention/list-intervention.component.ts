import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Browser } from "@syncfusion/ej2-base";
import {
  EditService,
  ToolbarService,
  PageService,
  DialogEditEventArgs,
  SaveEventArgs,
  GridComponent
} from "@syncfusion/ej2-angular-grids";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Dialog } from "@syncfusion/ej2-angular-popups";
import { InterventionService } from "../../Service/intervention.service";
import { DepartementService } from "src/app/setting/departement/departement.service";
import Departement from "../../Class/Departement";
import { SolutionService } from "src/app/Service/solution.service";
import Intervention from "src/app/Class/Intervention";

@Component({
  selector: "app-list-intervention",
  templateUrl: "./list-intervention.component.html",
  //styleUrls: ['./list-intervention.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class ListInterventionComponent implements OnInit {
  @Input() interventions;
  @Input() techs;
  @Input() user;
  @Output() MessageEvent = new EventEmitter<Intervention>();

  @ViewChild("grid") public grid: GridComponent;

  // public interventions: Intervention[];
  public priorities: { [key: string]: Object }[] = [
    { priority: "High" },
    { priority: "Medimum" },
    { priority: "Low" }
  ];
  public lStatus: { [key: string]: Object }[] = [
    { status: "In progress" },
    { status: "Waiting" },
    { status: "Canceled" },
    { status: "Closed" }
  ];
  public resolution: any[];
  today = new Date();
  public departements: string[];
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
  //
  public text: string = "Select a Technicien";
  public angForm: FormGroup;
  public shipCityDistinctData: Object[];
  public shipCountryDistinctData: Object[];
  public submitClicked = false;
  route: any;
  constructor(
    private ds: DepartementService,
    private ss: SolutionService,
    private is: InterventionService
  ) { }

  ngOnInit() {
    this.filterSettings = {
      type: "Menu"
    };

    this.ds.getDepartements().subscribe((data: Departement[]) => {
      this.getDepartement(data);
    });

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog"
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
        popupHeight: "100px"
      }
    };
    this.pageSettings = { pageSizes: true, pageSize: 8 };
    this.dropData = ["Order Placed", "Processing", "Delivered"];
  }

  createFormGroup(data: IOrderModel): FormGroup {
    data = this.replace_idByid(data);

    return new FormGroup({
      id: new FormControl(data.id, Validators.required),
      departement: new FormControl(data.departement, Validators.required),
      locality: new FormControl(data.locality, Validators.required),
      priority: new FormControl(data.priority),
      description: new FormControl(data.description,Validators.required),
      status: new FormControl(data.status),
      type: new FormControl(data.type),
      tech: new FormControl(data.tech),
      useMat: new FormControl(data.useMat),
      asset: new FormControl(data.asset),
      solution: new FormControl(data.solution)
    });
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
  //Action sur le tableau
  actionBegin(args: SaveEventArgs): void {
    //Verification de l'action debut edit ou ajout
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      this.submitClicked = false;
      //Creation du formulaire

      this.angForm = this.createFormGroup(args.rowData);
      console.log(this.angForm.value.id);
    }
    //Click SAVE
    if (args.requestType === "save") {
      this.submitClicked = true;
      //verification si le formulaire est valid
      if (this.angForm.valid) {
        args.data = this.angForm.value;
        if (
          args.data["asset"] != null &&
          args.data["solution"] != null &&
          args.data["useMat"] != null
        ) {
          console.log(args.data);
          this.ss.postSolution(args.data);
        } else {
          this.is.updateIntervention(args.data);
          this.MessageEvent.emit(this.interventions);
        }
      } else {
        console.log("Probleme");
        args.cancel = true;
      }
    }
  }
  historique(data) {
   this.ss.getSolutionByIdIntervention(data);
   
  
  }
  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 500 + "px";
        (args.dialog as Dialog).dataBind();
      }
      /* Set initail Focus
            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('id') as HTMLInputElement).focus();
            } else if (args.requestType === 'add') {
                (args.form.elements.namedItem('id') as HTMLInputElement).focus();
            }*/
    }
  }

  // get departement(): AbstractControl  { return this.angForm.get('departement'); }

  // get CustomerName(): AbstractControl { return this.angForm.get('CustomerName'); }

  // get OrderDate(): AbstractControl { return this.angForm.get('OrderDate'); }

  getDepartement(data) {
    const departementsList = new Array();

    data.forEach(element => {
      departementsList.push(element.departement);
    });

    this.departements = departementsList;
  }

  replace_idByid(data) {
    data = JSON.stringify(data);
    data = data.replace(/_id/g, "id");
    data = JSON.parse(data);
    return data;
  }

  ngOnChanges(): void {
    //console.log("ListIntervention changed", this.grid);
    //console.log(changes);
    //this.grid.refresh();
  }

  refreshInterventionTable() {
    this.grid.refresh();
  }
}

export interface IOrderModel {
  id?: number;
  departement?: string;
  locality?: string;
  priority?: string;
  day?: string;
  description?: string;
  status?: string;
  type?: string;
  tech?: string;
  useMat?: string;
  asset?: string;
  solution?: string;
}

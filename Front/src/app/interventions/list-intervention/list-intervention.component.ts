import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
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
import { DomaineService } from "src/app/Service/domaine.service";

@Component({
  selector: "app-list-intervention",
  templateUrl: "./list-intervention.component.html",
  //styleUrls: ['./list-intervention.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class ListInterventionComponent implements OnInit {
  @Input() interventions;
  @Input() domaine;
  @Input() maintenance;
  @Input() techs;
  @Input() user;
  @Output() MessageEvent = new EventEmitter<Intervention>();

  @ViewChild("grid") public grid: GridComponent;

  // public interventions: Intervention[];
  public priorities: { [key: string]: Object }[] = [
    { priority: "High" },
    { priority: "Medium" },
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
  //router: Router;

  constructor(
    private ds: DepartementService,
    private ss: SolutionService,
    private is: InterventionService,
    private router: Router
  ) {}

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
  sendLink(data) {
    this.router.navigate(["historic/"], { queryParams: { asset: data } });
  }

  createFormGroup(data: IOrderModel): FormGroup {
    data = this.replace_idByid(data);
    console.log(data);
    return new FormGroup({
      id: new FormControl(data.id, Validators.required),
      departement: new FormControl(data.departement, Validators.required),
      locality: new FormControl(data.locality, Validators.required),
      priority: new FormControl(data.priority),
      description: new FormControl(data.description),
      status: new FormControl(data.status),
      type: new FormControl(data.type),
      tech: new FormControl(data.tech),
      useMat: new FormControl(data.useMat),
      asset: new FormControl(data.asset),
      slug: new FormControl(data.slug),
      domaine: new FormControl(data.domaine),
      solution: new FormControl("")
    });
  }
  public sortComparer = (reference: string, comparer: string) => {
    if (reference < comparer) {
      return -1;
    }
    if (reference > comparer) {
      return 1;
    }
    return 0;
  };

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
      //TODO ajouté le ID sinon sa ne marche pas
      //verification si le formulaire est valid
      if (this.angForm.valid) {
        args.data = this.angForm.value;
        console.log(args.data);
        if (args.data["solution"] !== "") {
          console.log("save");
          this.ss.postSolution(args.data);
        } else {
          console.log("update");
          this.is.updateIntervention(args.data);
          this.MessageEvent.emit(this.interventions);
        }
      } else {
        console.log("Probleme");
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
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 500 + "px";
        (args.dialog as Dialog).dataBind();
      }
    }
  }
  /**
   * @param data
   * assigne liste des departement
   */
  getDepartement(data) {
    const departementsList = new Array();

    data.forEach(element => {
      departementsList.push(element.departement);
    });

    this.departements = departementsList;
  }
  /**
   * @param data
   * Modifie attribut _id en id
   */
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
  /**
   * refresh tableau liste intervention
   */
  refreshInterventionTable() {
    this.grid.refresh();
  }
}

export interface IOrderModel {
  domaine?: any;
  slug?: any;
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

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { Router } from "@angular/router";
import { Browser } from "@syncfusion/ej2-base";
import {
  EditService,
  ToolbarService,
  PageService,
  DialogEditEventArgs,
  SaveEventArgs,
  GridComponent,
  RowDataBoundEventArgs
} from "@syncfusion/ej2-angular-grids";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Dialog } from "@syncfusion/ej2-angular-popups";
import { SolutionService } from "src/app/Service/solution.service";
import Intervention from "src/app/Class/Intervention";
import * as _ from "lodash";
import Departement from 'src/app/Class/Departement';
import * as moment from "moment";


@Component({
  selector: "app-list-intervention",
  templateUrl: "./list-intervention.component.html",
  styleUrls: ["./list-intervention.component.css"],
  providers: [ToolbarService, EditService, PageService]
})
export class ListInterventionComponent implements OnInit {
  @Input() interventions;
  @Input() projet;
  @Input() metier;
  @Input() maintenance;
  @Input() techs;
  @Input() user;
  @Output() messageEvent = new EventEmitter<Intervention>();
  //Toast
  @ViewChild("element") element;
  @ViewChild("grid") public grid: GridComponent;

  // public interventions: Intervention[];
  public priorities: { [key: string]: Object }[] = [
    { priority: "High" },
    { priority: "Medium" },
    { priority: "Low" }
  ];
  public lStatus: { [key: string]: Object }[] = [
    { status: "Open" },
    { status: "Waiting" },
    { status: "Canceled" },
    { status: "Done" }
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
  public text = "Select a Technicien";
  public angForm: FormGroup;
  public shipCityDistinctData: Object[];
  public shipCountryDistinctData: Object[];
  public submitClicked = false;
  subCat: any;
  public departements:Departement;
  // router: Router;

  constructor(private ss: SolutionService, private router: Router) { }

  ngOnInit() {
    console.log(this.interventions,this.projet,this.departements)
    this.departements=this.projet[0].departements
    this.filterSettings = {
      type: "Menu"
    };
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
  /**
   * create formulaire en fonction des data present
   * @param data
   */
  createFormIntervention(data): FormGroup {
    console.log(data)
    if(this.user!="User"){
      this.findSubCat(data.metier);
    }

    if (this.user === "User") {
      return new FormGroup({
        _id: new FormControl(data._id, Validators.required),
        departement: new FormControl(
          data.departements[0]._id,
          Validators.required
        ),
        locality: new FormControl(data.locality ? data.locality : ""),
        priority: new FormControl(data.priority),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
        day: new FormControl(data.day),
        tech: new FormControl(data.tech),
        slug: new FormControl(data.slug)
      });
    } else if (this.user === "Admin") {
      console.log("Admin", data.departements[0],this.metier);
      this.metier = this.projet[0].metier;

      /*if (data.metier.length > 0 && data.metier != undefined) {
        metier = data.metier[0]._id;
      } else {
        metier = "";
      }*/
      console.log("Metier", this.metier);
      return new FormGroup({
        _id: new FormControl(data._id, Validators.required),
        departement: new FormControl(
          data.departements[0]._id,
          Validators.required
        ),

        locality: new FormControl(data.locality ? data.locality : ""),
        priority: new FormControl(data.priority),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
        type: new FormControl(data.type ? data.type : ""),
        day: new FormControl(data.day),
        tech: new FormControl(
          data.tech ? data.tech : null,
          Validators.required
        ),
        useMat: new FormControl(data.useMat ? data.useMat : null),
        asset: new FormControl(data.asset ? data.asset : null),
        slug: new FormControl(data.slug),
        metier: new FormControl(
          data.metier ? data.metier : null,
          Validators.required
        ),
        subCat: new FormControl(
          data.subCat ? data.subCat : null,
          Validators.required
        ),
        solution: new FormControl(data.solution ? data.solution : null)
      });
    } else {
      console.log("else", data);
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
        subCat: new FormControl(
          data.subCat ? data.subCat : null,
          Validators.required
        ),
        solution: new FormControl("")
      });
    }
  }

  createFormMaintenance(data): FormGroup {
    console.log('Formulaire Maintenance : ', data)
    return new FormGroup({
      _id: new FormControl(data._id, Validators.required),
      departement: new FormControl(
        data.departement,
        Validators.required
      ),
      locality: new FormControl(data.locality ? data.locality : ""),
      priority: new FormControl(data.priority),
      description: new FormControl(data.description),
      status: new FormControl(data.status),
      day: new FormControl(data.day)
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

  public onChange(args: any): void {
    this.findSubCat(args.itemData._id)
    /*console.log(this.subCat.categorie)
    this.subCat.categorie = args.itemData;
    console.log(args.itemData)
    console.log(this.subCat.categorie)*/
  }
  // Action sur le tableau
  actionBegin(args: SaveEventArgs): void {
    // Verification de l'action debut edit ou ajout
    console.log(args)
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      if (this.user == "User") {
        let data: any = args.rowData;
        if (data.idUser != localStorage._id) {
          args.cancel = true;
        }
      }
      let data: any = args.rowData;
      if (data.type == "JobRequest") {
        console.log("go", data)
        this.angForm = this.createFormIntervention(data);
      } else if ((data.type = "Maintenance")) {
        this.angForm = this.createFormMaintenance(data);
      }
    }
    // Click SAVE
    if (args.requestType === "save") {
      this.submitClicked = true;

      // verification si le formulaire est valid
      if (this.angForm.valid) {
        if(!this.angForm.value.dateAssing){
          this.angForm.value.dateAssing= moment().format("DD/MM/YYYY");
        };
        this.messageEvent.emit(this.angForm.value);
      } else {
        //retourn message error manque info
        this.showToast();
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
    let data: any = args.rowData;

    if (args.requestType === "beginEdit" || args.requestType === "add") {
      if (data.type == "JobRequest") {
        args.dialog.header = "Details of Intervention";
        if (Browser.isDevice) {
          args.dialog.height = window.innerHeight - 500 + "px";
          (args.dialog as Dialog).dataBind();
        }
      } else if (data.type == "Maintenance") {
        alert("actionCOmpelte Maintenance");
      }
    }
  }

  /**
   * refresh tableau liste intervention
   */
  refreshInterventionTable() {
    this.grid.refresh();
  }


  // Couleur par etat de ligne  https://stackblitz.com/edit/angular-9tucrb?file=app.component.ts
  rowDataBound(args: RowDataBoundEventArgs) {
    let data: any = args.data;

    if (data.type != "Maintenance") {
      if (
        data.metier != undefined &&
        (data.tech != undefined && data.tech.length > 0)
      ) {
        if (data["priority"] === "High") {
          args.row.classList.add("high");
        } else if (data["priority"] === "Medium") {
          args.row.classList.add("medium");
        } else if (data["priority"] === "Low") {
          args.row.classList.add("low");
        }
      }
    }
    if (data.type === "Maintenance") {
      args.row.classList.add("maintenance");
    }

    if (data.idUser != localStorage._id && this.user === "User") {
      args.row.classList.add("diffUser");
    }
  }


  findSubCat(data) {
   console.log(this.projet,data)
    let met = this.projet[0].metier
    console.log(met)
    let index = _.findIndex(met, function (o) { return o._id == data });
    this.subCat = met[index]
    console.log(met[index])
    console.log(this.subCat)
   
    
  }
  showToast() {
    //this.element.width = "50%";
    this.element.title = "<center>Error</center>";
    //this.element.animation.show.effect = "'Fade In";
    this.element.content =
      "<div class='e-custom'><center>You have not selected a Technician, category or subcategory</center></div>";
    this.element.cssClass = "e-toast-danger";
    this.element.show({ timeOut: 4000 });
  }
}

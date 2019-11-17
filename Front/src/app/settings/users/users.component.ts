import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { User } from "src/app/Class/user";
import { Hospital } from "src/app/Class/Hospital";
import { MustMatch } from "src/app/_helpers/must_match.validator";
import { UserService } from "src/app/Service/user.service";
import { HopitalService } from "src/app/Service/hopital.service";
import { EventRenderedArgs } from "@syncfusion/ej2-angular-schedule";
import Departement from "src/app/Class/Departement";
/**
 *
 *
 * @export
 * @class UsersComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  @Input() projet;
  @Input() role;
  @Output() messageEvent = new EventEmitter<User>();
  @Output() RoleModifie = new EventEmitter<any>();
  @Output() departementUser = new EventEmitter<Departement>();
  @Output() deparetmentUserRm = new EventEmitter<Departement>();
  @Output() idHopital = new EventEmitter<string>();
  hopital = new Hospital();
  lstatus: any;

  data: any[];
  userForm: FormGroup;
  data2: any = [];
  idUser: any;
  public mode: string;
  listeDepartement: [];
  constructor(
    private fb: FormBuilder,
    private us: UserService,
    private hs: HopitalService
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.role == "SuperAdmin") {
      this.lstatus = ["User", "Tech", "Operator", "Admin", "SuperAdmin"];
    } else {
      this.lstatus = ["User", "Tech", "Operator"];
    }
console.log(this.projet.length)
    this.mode = "CheckBox";
    this.data = this.projet;
    this.projet[0] != undefined
      ? (this.hopital = this.projet[0])
      : (this.hopital = null);
console.log(this.hopital)
    this.hs.getUserByHospital(this.hopital._id).subscribe((data: User) => {
      this.data2 = data;
    });
  }

  /**
   * creation formulaire pour super admin
   */
  // TODO Vérification Confirmation Password
  createForm() {
    this.userForm = this.fb.group({
      fullName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      statut: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      confPassword: new FormControl("", [Validators.required]),
      projet: new FormControl("")
    });
  }

  /**
   * detection changement
   */

  onChange(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.itemData !== undefined) {
      this.onSelection(changes.itemData);
    }
  }
  /**
   * complete formulaire lors du changement de selection de projet
   */
  //TODO a resoudre probleme constructor
  onSelection(data) {
    this.hopital = data;
    console.log("selectONe : ", data);
    this.hs.getUserByHospital(data._id).subscribe((data: User) => {
      this.data2 = data;
    });
    console.log(this.data2);
  }

  saveUser(data) {
    data.idHopital = this.projet._id;
    this.messageEvent.emit(data);
    this.userForm.reset();
  }

  /**
   * Liste User
   */

  public fields: Object = { text: "departement", value: "_id" };
  // map the groupBy field with category column
  public checkFields: Object = { text: "departement", value: "_id" };
  // set the placeholder to the MultiSelect input
  public checkWaterMark: string = "Select departement(s)";

  public select(args: any, id) {
    console.log(args);
    args.itemData.idUser = id._id;
    this.departementUser.emit(args.itemData);
  }
  public selectRole(args: any, id) {
    let role = { role: args.itemData.value, _id: id._id };
    console.log(role);
    this.RoleModifie.emit(role);
  }
  public removed(args: any, data) {
    args.itemData.idUser = data._id;
    this.deparetmentUserRm.emit(args.itemData);
  }
  /**
   *check box pre-competé
   */
  listeDep(data) {
    let liste: any = [];
    data.departements.forEach(element => {
      liste.push(element._id);
    });
    return liste;
  }
}

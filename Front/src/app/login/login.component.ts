import { UserService } from "./../Service/user.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  ToastComponent,
  ToastCloseArgs
} from "@syncfusion/ej2-angular-notifications";
import { AuthService } from "../Service/auth.service";
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  showToast: boolean = false;
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private us: UserService,
    private router: Router
  ) {
    this.createForm();
  }
  userForm: FormGroup;
  serverErrorMessages: string;

  username: String;
  password: String;
  @ViewChild("defaulttoast")
  public toastObj: ToastComponent;
  @ViewChild("navBar")
  public navBar: NavBarComponent;
  @ViewChild("toastBtnShow")
  public btnEleShow: ElementRef;
  public position: Object = { X: "Center" };
  public show: boolean=false
  createForm() {
    this.userForm = this.fb.group({
      fullName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.show=this.authService.authenticated
  }
  /**
   * Tentative login
   * si action ok setToken contien
   * fullName
   * status
   * email
   * @param {FormGroup} form
   * @memberof LoginComponent
   */
  async onLoginSubmit(form?: FormGroup) {
    if (form == undefined) {
      if (await this.authService.signIn()) {
        if (this.authService.user.displayName) {
      
          if (localStorage.status == "undefined") {
            console.log("user Undefined")
            let user = await this.us.getUserProfil(localStorage);
            this.us.getToLocalStorage(user);
            this.router.navigateByUrl("/interventions");
          }
           if (this.us.getStatus() === "SuperAdmin") {
             console.log("user SuperAdmin");
             this.router.navigateByUrl("/analyse");
           } else if (
             this.us.getIdDepartement().length == 0 &&
             this.us.getStatus() === "User"
           ) {
             console.log("redirection page Pas de Départemente contact admin")
             this.router.navigateByUrl("/");
           } else {
             this.router.navigateByUrl("/interventions");
           }
        }
      }
    } else {
      this.us.login(form.value).subscribe(
        res => {
          this.us.setToken(res["token"]);
          if (this.us.getStatus() === "SuperAdmin") {
            this.router.navigateByUrl("/analyse");
          } else {
            this.router.navigateByUrl("/interventions");
          }
        },
        err => {
          this.showToast = true;
          this.toastObj.show();
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }
}

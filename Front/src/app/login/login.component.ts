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

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
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
  @ViewChild("toastBtnShow")
  public btnEleShow: ElementRef;
  public position: Object = { X: "Center" };
  createForm() {
    this.userForm = this.fb.group({
      fullName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() { }
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
          console.log(this.authService.user)
          if (localStorage.status == "undefined") {
            let user = await this.us.getUserProfil(localStorage)
            this.us.getToLocalStorage(user)
            console.log(this.us.getIdDepartement())
            if (this.us.getStatus() === "SuperAdmin") {
              this.router.navigateByUrl("/analyse")
            } else {
              this.router.navigateByUrl("/interventions");
            }
          }
        }
      }
    } else {
      this.us.login(form.value).subscribe(
        res => {
          this.us.setToken(res["token"]);
          if (this.us.getStatus() === "SuperAdmin") {
            this.router.navigateByUrl("/analyse")
          } else {
            this.router.navigateByUrl("/interventions");
          }
        },
        err => {
          this.toastObj.show();
          this.serverErrorMessages = err.error.message;
        }
      );
    }

  }

}

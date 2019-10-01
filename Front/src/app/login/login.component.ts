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
    private authService: AuthService,
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

  ngOnInit() {}
  /**
   * Tentative login
   * si action ok setToken contien
   * fullName
   * status
   * email
   * @param {FormGroup} form
   * @memberof LoginComponent
   */
  onLoginSubmit(form: FormGroup) {
    this.us.login(form.value).subscribe(
      res => {
        // this.us.setToken(res.);
        this.router.navigateByUrl("/interventions");
      },
      err => {
        this.toastObj.show();
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  async signIn(): Promise<void> {
    if (await this.authService.signIn()) {
      if (this.authService.user.displayName) {
        this.us.postUser(this.authService.user);

        this.router.navigateByUrl("/interventions");
      }
    }
  }
}

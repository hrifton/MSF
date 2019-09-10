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
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  serverErrorMessages: string;
  createForm() {
    this.userForm = this.fb.group({
      fullName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  username: String;
  password: String;

  constructor(
    private fb: FormBuilder,
    private us: UserService,
    private router: Router
  ) {
    this.createForm();
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
        this.us.setToken(res["token"]);
        this.router.navigateByUrl("/interventions");
      },
      err => {
        this.toastObj.show();
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  @ViewChild('defaulttoast')
  public toastObj: ToastComponent;
  @ViewChild('toastBtnShow')
  public btnEleShow: ElementRef;
  public position: Object = { X: 'Center' };
}

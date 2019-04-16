import { UserService } from './../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  serverErrorMessages:string;
  createForm() {
    this.userForm=this.fb.group({
      fullName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
  }

  username:String;
  password:String;


  constructor(private fb:FormBuilder, private us: UserService,private router:Router) {
    this.createForm();
   }

  ngOnInit() {
  }
  onLoginSubmit(form:FormGroup){
    console.log(form.valid);
    this.us.login(form.value).subscribe(res=>{
      this.us.setToken(res['token']);
      this.router.navigateByUrl('/interventions')
    },err=>{
this.serverErrorMessages=err.error.message;

    })
  }

}

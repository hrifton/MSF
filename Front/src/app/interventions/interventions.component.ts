import { UserService } from './../Service/user.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import Intervention from 'src/app/intervention/Intervention';
import { InterventionService } from './../Service/intervention.service';
import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { User } from '../Class/user.model';
import { Ng6OdooRPCService } from "../Service/odoo.service";



@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  //styleUrls: ['./interventions.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterventionsComponent implements OnInit {
  public interventions: Intervention[];
  userDetails;
  techs: User[];
  constructor(
    private is: InterventionService,
    private us: UserService,
    private odooRPC: Ng6OdooRPCService

  ) {}

  update($event){
    this.interventions.unshift($event)
  }


  ngOnInit(){
    this.us.getUserProfil().subscribe(
      res=>{
        this.userDetails=res['user'];

        //gestion Du type d'utilisateur
        if(this.userDetails.status=="user"){
            this.is.getInterventionsByUser(this.userDetails.fullName).subscribe((data:Intervention[])=>{this.interventions=data})
        }
        else if(this.userDetails.status=="tech"){
          this.is.getInterventionsBytech(this.userDetails.fullName).subscribe((data:Intervention[])=>{this.interventions=data})
        }
        else{
           this.is.getInterventions().subscribe((data: Intervention[]) => {
      this.interventions = data; });
        }
      },
      err=>{}
    );
    this.us.getUserTech().subscribe((data:User[])=>{
      this.techs=data;
    });
/*
    this.odooRPC.init({
      odoo_server: 'http://trackmystuff-dev.ocb.msf.org',
      http_auth: 'HQ@brussels.msf.org:TMS123' // optional
    });
    this.odooRPC.login('MSF', 'HQ@brussels.msf.org', 'TMS123').then(res => {
      console.log('login success');
    }).catch( err => {
      console.error('login failed', err);
    });*/



}
  }



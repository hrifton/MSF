import { Router } from "@angular/router";
//import { UsersComponent } from './../users/users.component';
import { Component, OnInit, SimpleChanges, SimpleChange } from "@angular/core";
//import { NgModule } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
//import jwtDecode from 'jwt-decode';
import { UserService } from "../Service/user.service";
import { AuthService } from "../Service/auth.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  public user: any ;
  show: boolean;
  opened: boolean = false;
  showLogOut: boolean = false;
  showMenu: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private us: UserService,
    private as: AuthService
  ) {
    this.show = false;
    this.refreshNav();
  }
  changeStatus(status: boolean): void {
    console.log(status);
  }
  storage: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  ngOnInit(): void {
    if(this.us.getStatus()==null){
      this.showMenu=false
    }else{
      this.showMenu=true
    }
    this.authService.getLoggedInName.subscribe(status =>
      this.changeStatus(status)
    );
   
  }


  LogOut() {
    localStorage.clear();
    this.as.signOut();
    this.router.navigateByUrl("/");
  }
 
/**
 *Open/close NavBare
 *
 * @memberof NavBarComponent
 */
switchOpened() {
    console.log("switch");
    this.opened = !this.opened;
    this.refreshNav();
  }
  /**
   *refresh navBar depending on the status
   *
   * @memberof NavBarComponent
   */
  refreshNav() {
     this.user = this.us.getFullName();
    if (this.us.getStatus() == "User" || this.us.getStatus() == "Tech") {
      console.log("dans le false");
      this.show = false;
    } else if (
      this.us.getStatus() == "SuperAdmin" ||
      this.us.getStatus() == "Admin"
    ) {
      console.log("dans le true");
      this.show = true;
    } else {
      //TODO a resoudre synchronisation navBar
      this.show = false;
    }
    this.showLogOut=true
  }
  
}

import { Router } from "@angular/router";
//import { UsersComponent } from './../users/users.component';
import { Component, OnInit, SimpleChanges } from "@angular/core";
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
  public user: any;
  show: boolean;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private us: UserService,
    private as: AuthService
  ) {
    this.show = false
    this.user = localStorage;
    if (this.user.status == "User" || this.user.status == "tech") {
      this.show = false;
    } else {
      this.show = true;
    }
  }
  storage: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  ngOnInit(): void {
    localStorage = null
    console.log(localStorage);
    this.storage = localStorage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

  }

  LogOut() {
    this.us.deleteToken();
    this.as.signOut();
    this.router.navigateByUrl("/");
  }
}

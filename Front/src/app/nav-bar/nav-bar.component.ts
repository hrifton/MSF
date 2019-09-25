import { Router } from '@angular/router';
//import { UsersComponent } from './../users/users.component';
import { Component, OnInit } from '@angular/core';
//import { NgModule } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import jwtDecode from 'jwt-decode';
import { UserService } from '../Service/user.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private us: UserService
  ) {
    let user = localStorage;
   
  }
  storage:any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  ngOnInit(): void {
    this.storage=localStorage;
   
  }

  LogOut() {
    this.us.deleteToken();
    this.router.navigateByUrl("/login");
  }
}

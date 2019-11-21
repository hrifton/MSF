import { Injectable, Output, EventEmitter } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { Client } from "@microsoft/microsoft-graph-client";

// import { AlertsService } from "./alerts.service";
import { OAuthSettings } from "../auth/oauth";
import { User } from "../Class/user";
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  public authenticated: boolean;
  public user: User;
  private loggedIn = new BehaviorSubject<boolean>(false);
  loader: boolean;
  constructor(
    private msalService: MsalService,
    private us: UserService,
    private router: Router // private alertsService: AlertsService
  ) {
    if (localStorage.status == undefined) {
      console.log("status non defini");
      this.authenticated = this.msalService.getUser() != null;
      this.getUser().then(user => {
        this.user = user;
      });
    }
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<boolean> {
    const result = await this.msalService
      .loginPopup(OAuthSettings.scopes)
      .catch(reason => {
        console.log("error");
        console.log("Login failed", JSON.stringify(reason, null, 2));
      });
        this.loader=true
    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();

      return true;
    }
  }

  // Sign out
  signOut(): void {
    localStorage.clear();
    this.msalService.logout();
    this.loggedIn.next(false);
    this.user = null;
    this.authenticated = false;
    this.router.navigate(["/login"]);
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    const result = await this.msalService
      .acquireTokenSilent(OAuthSettings.scopes)
      .catch(reason => {
        console.log("Get token failed", JSON.stringify(reason, null, 2));
      });

    console.log(result);

    return result;
  }

  private async getUser(): Promise<User> {
    if (!this.authenticated) {
      return null;
    }

    const graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async done => {
        const token = await this.getAccessToken().catch(reason => {
          done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
    //TODO travail d'authentification a faire ici Azure
    // Get the user from Graph (GET /me)
    const graphUser = await graphClient.api("/me").get();
    const user = new User();
    user.displayName = graphUser.displayName;
    console.log(graphUser);
    this.us.getToLocalStorage(graphUser);
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;
    return user;
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getLoader(){
   return this.loader
  }
}

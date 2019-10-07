import { Injectable } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { Client } from "@microsoft/microsoft-graph-client";

// import { AlertsService } from "./alerts.service";
import { OAuthSettings } from "../auth/oauth";
import { User } from "../Class/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor(
    private msalService: MsalService // private alertsService: AlertsService
  ) {
    this.authenticated = this.msalService.getUser() != null;
    this.getUser().then(user => {
      this.user = user;
    });
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<boolean> {
    const result = await this.msalService
      .loginPopup(OAuthSettings.scopes)
      .catch(reason => {
        console.log("Login failed", JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();
      return true;
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    const result = await this.msalService
      .acquireTokenSilent(OAuthSettings.scopes)
      .catch(reason => {
        console.log("Get token failed", JSON.stringify(reason, null, 2));
      });

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

    // Get the user from Graph (GET /me)
    const graphUser = await graphClient.api("/me").get();
    const user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;

    return user;
  }
}

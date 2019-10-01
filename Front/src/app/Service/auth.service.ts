import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';

// import { AlertsService } from "./alerts.service";
import { OAuthSettings } from '../auth/oauth';
import { User } from '../Class/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public user: User;

  /**
   *Creates an instance of AuthService.
   * @param {UserService} us
   * @param {MsalService} msalService
   * @memberof AuthService
   */
  constructor(private us: UserService,
              private msalService: MsalService
  ) {
    this.authenticated = this.msalService.getUser() != null;
    this.getUser().then(user => {
      this.user = user;
    });
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  /**
   *
   *
   * @returns {Promise<boolean>}
   * @memberof AuthService
   */
  async signIn(): Promise<boolean> {
    const result = await this.msalService
      .loginPopup(OAuthSettings.scopes)
      .catch(reason => {
        console.log('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();
      if(this.user){
        this.us.postUser(this.user);
      }
      return true;
    }
  }

  // Sign out
  /**
   *
   *
   * @memberof AuthService
   */
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
        console.log('Get token failed', JSON.stringify(reason, null, 2));
      });

    return result;
  }

  /**
   *
   *
   * @private
   * @returns {Promise<User>}
   * @memberof AuthService
   */
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
          done('Could not get an access token', null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    const graphUser = await graphClient.api('/me').get();

    const user = new User();

    user.msfId = graphUser.id;
    user.displayName = graphUser.displayName;
    user.email = graphUser.mail || graphUser.userPrincipalName;



    return user;
  }
}

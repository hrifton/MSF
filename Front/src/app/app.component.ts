import { Component } from "@angular/core";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "MSF Regie";

  constructor(
    private _loadingBar: SlimLoadingBarService,
    private _router: Router
  ) {
    moment.locale("us");
    const currentTimeFR = moment().format("LLLL");
    console.log(currentTimeFR);
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}

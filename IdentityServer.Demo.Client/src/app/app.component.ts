import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingIndicatorService } from '@browninglogic/ng-loading-indicator';
import { AuthenticationService } from './services/authentication.service';
import { ErrorHandlingService } from './services/error-handling.service';
import { interval, Subscription } from 'rxjs';
import { Moment } from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'IdentityServer Demo Client';

  public secondInterval: Subscription;
  public identityTokenExpirationInfo: Object;
  public accessTokenExpirationInfo: Object;

  constructor(private authenticationService: AuthenticationService,
    private loadingIndicatorService: LoadingIndicatorService,
    private errorHandlingService: ErrorHandlingService) {}

  public ngOnInit() {
    /* Update the expiration info on a 1 second interval in order to keep
    the expiresIn values updated in the template. */
    this.secondInterval = interval(1000).subscribe(() => this.updateExpirationInfo());
  }

  public ngOnDestroy() {
    this.secondInterval.unsubscribe();
  }

  public get userAuthenticated(): boolean {
    return this.authenticationService.authenticated;
  }

  public logIn() {
    this.authenticationService.initImplicitFlow();
  }

  public logOut() {
    this.authenticationService.logOut();
  }

  public silentRefresh() {
    // Explicitly trigger silent refresh to demonstrate the functionality.
    this.loadingIndicatorService.showLoadingIndicator('Performing Silent Refresh');
    this.authenticationService.silentRefresh()
      .then(() => alert('Silent Refresh Successful'))
      .catch(error => this.errorHandlingService.handleError(error, 'Silent Refresh Failed'))
      .then(() => this.loadingIndicatorService.hideLoadingIndicator());
  }

  public get identityTokenClaims(): Object {
    return this.authenticationService.idTokenClaims;
  }

  public get accessTokenClaims(): Object {
    return this.authenticationService.accessTokenClaims;
  }

  /** Updates the token expiration objects with the latest value
   * in order to be bound to the template */
  private updateExpirationInfo(): void {
    if(this.authenticationService.authenticated) {
      this.identityTokenExpirationInfo = this.formatTokenExpirationInfo(
        this.authenticationService.idTokenExpiration, 
        this.authenticationService.idTokenExpired, 
        this.authenticationService.idTokenExpiresIn);

      this.accessTokenExpirationInfo = this.formatTokenExpirationInfo(
        this.authenticationService.accessTokenExpiration, 
        this.authenticationService.accessTokenExpired, 
        this.authenticationService.accessTokenExpiresIn);
    }
    else {
      this.identityTokenExpirationInfo = null;
      this.accessTokenExpirationInfo = null;
    }
  }

  /** Packages up the relevant expiration info as an object for display 
   * in the template using the json pipe */
  private formatTokenExpirationInfo(expiration: Moment, expired: boolean, expiresIn: number) {
    return {
      'expiration': expiration,
      'expired': expired,
      'expiresIn': expiresIn
    }
  }
}

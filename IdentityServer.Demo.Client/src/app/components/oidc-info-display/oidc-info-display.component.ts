import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Moment } from 'moment';

@Component({
  selector: 'oidc-info-display',
  templateUrl: './oidc-info-display.component.html',
  styleUrls: ['./oidc-info-display.component.css']
})
export class OidcInfoDisplayComponent implements OnInit, OnDestroy {
  public secondInterval: Subscription;
  public identityTokenExpirationInfo: Object;
  public accessTokenExpirationInfo: Object;

  constructor(private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    /* Update the expiration info on a 1 second interval in order to keep
    the expiresIn values updated in the template. */
    this.secondInterval = interval(1000).subscribe(() => this.updateExpirationInfo());
  }

  public ngOnDestroy() {
    this.secondInterval.unsubscribe();
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
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigService } from './config.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';
import { authConfig } from '../config/auth.config';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private readonly _tokenProcessed = new BehaviorSubject<boolean>(false);

  constructor(private oauthService: OAuthService, private configService : ConfigService) {
    this.oauthService.configure(authConfig);
    /* Load the configuration from the discovery document and process the provided
    ID token if present.  Afterwards set _tokenProcessed to true so that anybody listening
    to tokenProcessed knows that the token has been processed.*/
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => this._tokenProcessed.next(true));
  }

  /** Emits once the discovery document has been loaded and the id token has been
   * processed, or immediately if subscribed to after the aforementioned has
   * already occurred. */
  public tokenProcessed() : Observable<void> {
      return this._tokenProcessed.pipe(
          filter(processed => processed == true),
          map(() =>null)
        )
  }

  /** Redirects the user to the IdentityServer login page for implicit flow */
  public initImplicitFlow() : void {
    this.oauthService.initImplicitFlow();
  }

  /** Tells whether the user is currently authenticated with a valid, non-expired tokens */
  public get authenticated() : boolean {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }

  /** Access token expiration as a Javascript date */
  public get accessTokenExpiration() : Date {
    return moment(this.oauthService.getAccessTokenExpiration()).toDate();
  }

  /** ID token expiration as a Javascript date */
  public get idTokenExpiration() : Date {
    return moment(this.oauthService.getIdTokenExpiration()).toDate();
  }
}

import { Injectable } from '@angular/core';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';
import { authConfig } from '../config/auth.config';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private readonly _tokenProcessed = new BehaviorSubject<boolean>(false);

  constructor(private oauthService: OAuthService) {
    // Initialize the oauth service with our auth config settings
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
  public logOut(): void {
    this.oauthService.logOut();
  }

  /** Explicitly initiate silent refresh */
  public silentRefresh(): Promise<OAuthEvent> {
    return this.oauthService.silentRefresh();
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

  /** Claims included in the id token */
  public get idTokenClaims() : Object {
    return this.oauthService.getIdentityClaims();
  }

  /** Claims included in the access token. */
  public get accessTokenClaims() : Object {
    return jwtDecode(this.oauthService.getAccessToken());
  }
}

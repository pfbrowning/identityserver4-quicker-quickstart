import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { LoadingIndicatorService } from '@browninglogic/ng-loading-indicator';
import { IdentityServerSampleApiService } from 'src/services/identity-server-sample-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IdentityServer Demo Client';
  constructor(private authenticationService: AuthenticationService,
    private loadingIndicatorService: LoadingIndicatorService,
    private identityServerSampleApiService: IdentityServerSampleApiService) {}

  public publicResource: string[];
  public protectedResource: object[];

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
      .catch(error => alert(`Silent Refresh Failed: ${error.type}`))
      .then(() => this.loadingIndicatorService.hideLoadingIndicator());
  }

  public get identityTokenClaims(): Object {
    return this.authenticationService.idTokenClaims;
  }

  public get accessTokenClaims(): Object {
    return this.authenticationService.accessTokenClaims;
  }

  public fetchPublicResource(): void {
    this.loadingIndicatorService.showLoadingIndicator('Fetching Public Resource');
    this.identityServerSampleApiService.fetchPublicResource().pipe(
      finalize(() => this.loadingIndicatorService.hideLoadingIndicator())
    ).subscribe(publicResource => this.publicResource = publicResource);
  }

  public fetchProtectedResource(): void {
    this.loadingIndicatorService.showLoadingIndicator('Fetching Protected Resource');
    this.identityServerSampleApiService.fetchProtectedResource().pipe(
      finalize(() => this.loadingIndicatorService.hideLoadingIndicator())
    ).subscribe(protectedResource => this.protectedResource = protectedResource);
  }
}

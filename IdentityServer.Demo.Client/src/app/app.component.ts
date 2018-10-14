import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IdentityServer Demo Client';
  constructor(private authenticationService: AuthenticationService) {}

  public get userAuthenticated() : boolean {
    return this.authenticationService.authenticated;
  }

  public logIn() {
    this.authenticationService.initImplicitFlow();
  }

  public logOut() {
    this.authenticationService.logOut();
  }

  public silentRefresh() {
    this.authenticationService.silentRefresh()
      .then(() => alert('Silent Refresh Successful'))
      .catch(error => alert(`Silent Refresh Failed: ${error.type}`));
  }

  public get identityTokenClaims() : Object {
    return this.authenticationService.idTokenClaims;
  }

  public get accessTokenClaims() : Object {
    return this.authenticationService.accessTokenClaims;
  }
}

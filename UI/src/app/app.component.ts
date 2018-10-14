import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bl-is-sample-ui';
  constructor(private authenticationService: AuthenticationService) {}

  public get userAuthenticated() : boolean {
    return this.authenticationService.authenticated;
  }

  public logIn() {
    this.authenticationService.initImplicitFlow();
  }
}

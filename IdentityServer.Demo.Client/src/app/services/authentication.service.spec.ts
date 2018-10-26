import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceStub } from './oauth.service.stub';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: OAuthService, useClass: OAuthServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});

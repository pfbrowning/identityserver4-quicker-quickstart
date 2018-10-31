import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OidcInfoDisplayComponent } from './components/oidc-info-display/oidc-info-display.component';
import { NgLoadingIndicatorModule } from '@browninglogic/ng-loading-indicator';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import { ErrorWindowComponent } from './components/error-window/error-window.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceStub } from './services/oauth.service.stub';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationServiceStub } from './services/authentication.service.stub';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoadingIndicatorModule,
        ModalManagerModule
      ],
      declarations: [
        AppComponent,
        OidcInfoDisplayComponent,
        ErrorWindowComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'OIDC Test Client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('OIDC Test Client');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to OIDC Test Client!');
  });
});

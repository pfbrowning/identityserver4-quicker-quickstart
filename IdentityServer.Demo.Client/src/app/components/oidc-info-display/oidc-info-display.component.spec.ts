import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcInfoDisplayComponent } from './oidc-info-display.component';
import { OAuthServiceStub } from 'src/app/services/oauth.service.stub';
import { OAuthService } from 'angular-oauth2-oidc';

describe('OidcInfoDisplayComponent', () => {
  let component: OidcInfoDisplayComponent;
  let fixture: ComponentFixture<OidcInfoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OidcInfoDisplayComponent ],
      providers: [
        { provide: OAuthService, useClass: OAuthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

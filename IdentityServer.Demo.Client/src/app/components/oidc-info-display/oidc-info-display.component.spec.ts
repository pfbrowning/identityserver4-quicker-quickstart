import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcInfoDisplayComponent } from './oidc-info-display.component';

describe('OidcInfoDisplayComponent', () => {
  let component: OidcInfoDisplayComponent;
  let fixture: ComponentFixture<OidcInfoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OidcInfoDisplayComponent ]
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

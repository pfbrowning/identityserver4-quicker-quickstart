import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorWindowComponent } from './error-window.component';
import { ModalManagerModule } from '@browninglogic/ng-modal';

describe('ErrorWindowComponent', () => {
  let component: ErrorWindowComponent;
  let fixture: ComponentFixture<ErrorWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalManagerModule ],
      declarations: [ ErrorWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorWindowComponent } from './error-window.component';
import { ModalManagerModule, ModalWindowComponent } from '@browninglogic/ng-modal';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { By } from '@angular/platform-browser';

describe('ErrorWindowComponent', () => {
  let component: ErrorWindowComponent;
  let fixture: ComponentFixture<ErrorWindowComponent>;
  let errorHandlingService: ErrorHandlingService;
  let errorModal: ModalWindowComponent;
  // let errorMessageElement: any;
  // let errorCommentElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalManagerModule ],
      declarations: [ ErrorWindowComponent ],
      providers: [ ErrorHandlingService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorWindowComponent);
    component = fixture.componentInstance;
    errorHandlingService = fixture.debugElement.injector.get(ErrorHandlingService);
    errorModal = component.errorModal;
    //let errorMessageElement = fixture.debugElement.query(By.css('.errorMessage'));
    //console.log('element', errorMessageElement);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal on error', () => {
    expect(errorModal.visible).toBe(false);

    errorHandlingService.handleError(new Error("Test Error"), "Test Message");

    expect(errorModal.visible).toBe(true);
    expect(component.appError.error['message']).toBe("Test Error");
    expect(component.appError.comment).toBe("Test Message");
    //expect(errorMessageElement.innerText).toBe("Test Error");
  })
});

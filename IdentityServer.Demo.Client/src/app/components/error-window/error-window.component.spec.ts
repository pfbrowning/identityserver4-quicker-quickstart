import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorWindowComponent } from './error-window.component';
import { ModalManagerModule, ModalWindowComponent } from '@browninglogic/ng-modal';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ErrorWindowComponent', () => {
  let component: ErrorWindowComponent;
  let fixture: ComponentFixture<ErrorWindowComponent>;
  let errorHandlingService: ErrorHandlingService;
  let errorModal: ModalWindowComponent;

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
    errorModal = component.errorModal;
    errorHandlingService = fixture.debugElement.injector.get(ErrorHandlingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal on error', () => {
    /* Expect that upon initialization the modal is not visible and that
    no error message has been bound to the template. */
    expect(errorModal.visible).toBe(false);
    expect(getElementBySelector<ErrorWindowComponent>(fixture, '.errorMessage')).toBeNull();

    // Simulate the occurrence of an error
    errorHandlingService.handleError(new Error("Test Error"), "Test Message");
    fixture.detectChanges();

    /* Expect that the modal is visible and the message and comment have been assigned
    to the appError model and bound to the template. */
    expect(errorModal.visible).toBe(true);
    expect(component.appError.error['message']).toBe("Test Error");
    expect(component.appError.comment).toBe("Test Message");
    expect(getElementTextBySelector<ErrorWindowComponent>(fixture, '.errorMessage')).toBe("Test Error");
    expect(getElementTextBySelector<ErrorWindowComponent>(fixture, '.errorComment')).toBe("Test Message");
  })

  function getElementBySelector<ComponentType>(fixture: ComponentFixture<ComponentType>, selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    return debugElement != null ? debugElement.nativeElement : null;
  }

  function getElementTextBySelector<ComponentType>(fixture: ComponentFixture<ComponentType>, selector: string) {
    const nativeElement = getElementBySelector<ComponentType>(fixture, selector);
    return nativeElement != null ? nativeElement.innerText : null;
  }
});

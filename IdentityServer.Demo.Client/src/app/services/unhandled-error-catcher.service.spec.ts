import { TestBed } from '@angular/core/testing';

import { UnhandledErrorCatcher } from './unhandled-error-catcher.service';

describe('UnhandledErrorCatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnhandledErrorCatcher = TestBed.get(UnhandledErrorCatcher);
    expect(service).toBeTruthy();
  });
});

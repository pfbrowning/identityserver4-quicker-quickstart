import { TestBed } from '@angular/core/testing';

import { UnhandledErrorCatcherService } from './unhandled-error-catcher.service';

describe('UnhandledErrorCatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnhandledErrorCatcherService = TestBed.get(UnhandledErrorCatcherService);
    expect(service).toBeTruthy();
  });
});

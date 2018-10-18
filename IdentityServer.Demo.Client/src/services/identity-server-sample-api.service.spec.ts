import { TestBed } from '@angular/core/testing';

import { IdentityServerSampleApiService } from './identity-server-sample-api.service';

describe('IdentityServerSampleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityServerSampleApiService = TestBed.get(IdentityServerSampleApiService);
    expect(service).toBeTruthy();
  });
});

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let oauthServiceSpy: any;
  let errorHandlingServiceSpy: any;

  beforeEach(() => {
    // Mock up spies to inject as dependencies
    oauthServiceSpy = jasmine.createSpyObj('oauthServiceSpy', [
      'configure',
      'loadDiscoveryDocumentAndTryLogin',
      'setupAutomaticSilentRefresh',
      'initImplicitFlow',
      'logOut',
      'silentRefresh',
      'hasValidIdToken',
      'hasValidAccessToken',
      'getIdentityClaims',
      'getAccessToken'
    ]);
    errorHandlingServiceSpy = jasmine.createSpyObj('errorHandlingServiceSpy', ['handleError']);
    oauthServiceSpy.loadDiscoveryDocumentAndTryLogin.and.returnValue(Promise.resolve());
  });

  it('should properly construct', (done: DoneFn) => {
    // Initialize the service
    authenticationService = new AuthenticationService(oauthServiceSpy, errorHandlingServiceSpy);

    /* Check that the corresponding spies have been called
    in the expected fashion */
    expect(oauthServiceSpy.configure).toHaveBeenCalledTimes(1);
    expect(oauthServiceSpy.loadDiscoveryDocumentAndTryLogin).toHaveBeenCalledTimes(1);
    expect(oauthServiceSpy.setupAutomaticSilentRefresh).toHaveBeenCalledTimes(1);
    expect(errorHandlingServiceSpy.handleError).not.toHaveBeenCalled();

    // Expect that the tokenProcessed observable emits before completing the test
    authenticationService.tokenProcessed().subscribe(() => done());
  });

  it('should properly handle an error during loadDiscoveryDocumentAndTryLogin', (done: DoneFn) => {
    // Tell the loadDiscoveryDocumentAndTryLogin spy to reject the promise
    oauthServiceSpy.loadDiscoveryDocumentAndTryLogin.and.returnValue(Promise.reject("Test Promise Rejection"));
    // When handleError gets called, test that the params are what we expect
    errorHandlingServiceSpy.handleError.and.callFake((caughtError, errorComment) => {
      expect(caughtError).toBe('Test Promise Rejection');
      expect(errorComment).toBe('Failed to load discovery document: Is your OIDC provider configured and running?');
      // require handleError to be called before completing the test
      done();
    })

    // Initialize the service
    authenticationService = new AuthenticationService(oauthServiceSpy, errorHandlingServiceSpy);

    // Expect that the standard functions were called
    expect(oauthServiceSpy.configure).toHaveBeenCalledTimes(1);
    expect(oauthServiceSpy.loadDiscoveryDocumentAndTryLogin).toHaveBeenCalledTimes(1);
    expect(oauthServiceSpy.setupAutomaticSilentRefresh).toHaveBeenCalledTimes(1);
  });

  it('should properly call initImplicitFlow', () => {
    // Arrange: Initialize the service
    authenticationService = new AuthenticationService(oauthServiceSpy, errorHandlingServiceSpy);

    // Act: Call initImplicitFlow
    authenticationService.initImplicitFlow();

    // Assert: Expect that initImplicitFlow in the underlying OAuthService has been called
    expect(oauthServiceSpy.initImplicitFlow).toHaveBeenCalledTimes(1);
  })

  it('should properly call logOut', () => {
    // Arrange: Initialize the service
    authenticationService = new AuthenticationService(oauthServiceSpy, errorHandlingServiceSpy);

    // Act: Call logOut
    authenticationService.logOut();

    // Assert: Expect that logOut in the underlying OAuthService has been called
    expect(oauthServiceSpy.logOut).toHaveBeenCalledTimes(1);
  })

  it('should properly call silentRefresh', () => {
    // Arrange: Initialize the service
    authenticationService = new AuthenticationService(oauthServiceSpy, errorHandlingServiceSpy);

    // Act: Call silentRefresh
    authenticationService.silentRefresh();

    // Assert: Expect that silentRefresh in the underlying OAuthService has been called
    expect(oauthServiceSpy.silentRefresh).toHaveBeenCalledTimes(1);
  })

  it('should properly determine authenticated', () => {
    // Arrange: Initialize the service & declare test data
    authenticationService = new AuthenticationService(oauthServiceSpy, errorHandlingServiceSpy);

    const testEntries = [
      { validId: true, validAccess: true, expected: true },
      { validId: true, validAccess: false, expected: false },
      { validId: false, validAccess: true, expected: false },
      { validId: false, validAccess: false, expected: false }
    ]

    testEntries.forEach(testEntry => {
      // Arrange: configure the spy to return test entry values for valid id & access tokens
      oauthServiceSpy.hasValidIdToken.and.returnValue(testEntry.validId);
      oauthServiceSpy.hasValidAccessToken.and.returnValue(testEntry.validAccess);

      // Act & Assert: expect that the authenticated property matches the expected value
      expect(authenticationService.authenticated).toBe(testEntry.expected);
    });
  })

  // it('should properly pass through id token claims', () => {

  // })
});

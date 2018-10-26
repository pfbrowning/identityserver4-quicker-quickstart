import { AuthConfig, OAuthEvent, EventType, OAuthInfoEvent } from "angular-oauth2-oidc";
import { Observable, of } from "rxjs";

export class OAuthServiceStub {
    public configure(authConfig: AuthConfig) : void {}
    public loadDiscoveryDocumentAndTryLogin() : Promise<void> {
        return Promise.resolve();
    }
    public hasValidIdToken() : boolean {
        return true;
    }
    public hasValidAccessToken() : boolean {
        return true;
    }
    public getIdentityClaims() : object {
        return {};
    }
    public getAccessToken() : string {
        return null;
    }
    // public get events(): Observable<OAuthEvent> {
    //     return of(new OAuthInfoEvent("user_profile_loaded"));
    // }
    // public getIdTokenExpiration() {
    //     return 0;
    // }
    // public getAccessTokenExpiration() {
    //     return 0;
    // }
    public setupAutomaticSilentRefresh() : Promise<void> {
        return Promise.resolve();
    }
}
import { Moment } from 'moment';

export class AuthenticationServiceStub {
    public authenticated: boolean = false;
    public accessTokenExpiration : Moment = null;
    public idTokenExpiration : Moment = null;
    public idTokenExpired : boolean = true;
    public accessTokenExpired : boolean = true;
    public idTokenExpiresIn : number = null;
    public accessTokenExpiresIn : number = null;
    public idTokenClaims: Object = null;
    public accessTokenClaims: Object = null;
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityServerSampleApiService {
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  public fetchPublicResource() : Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${appConfig.identityServerSampleApiServiceUrl}/PublicResource`);
  }

  public fetchProtectedResource() : Observable<Array<object>> {
    return this.httpClient.get<Array<object>>(`${appConfig.identityServerSampleApiServiceUrl}/ProtectedResource`, 
      { headers : new HttpHeaders({"Authorization" : "Bearer " + this.authenticationService.accessToken})});
  }
}

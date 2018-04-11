import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ResellerService {
  apiUrl = environment.apiUrl;
  entity = 'resellers/';
  eventObject;
  httpOptions: any;
  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) {
    this.httpOptions = this.authService.getHeaders();
  }

  public getAllReseller() {
    // now returns an Observable of Config
    const resellers$ = this.http.get(this.apiUrl + this.entity , this.httpOptions);
    console.log('resellers', resellers$);
    return resellers$;
  }

}


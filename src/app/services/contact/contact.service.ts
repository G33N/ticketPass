import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ContactService {
  apiUrl = environment.apiUrl;
  entity = 'notifications/contact';
  eventObject;

  constructor(
    private http: HttpClient
  ) { }

  public sendEmail(data) {
    // now returns an Observable of Config
    const email$ = this.http.get(this.apiUrl + this.entity + data);
    return email$;
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class EventsService {
  apiUrl = environment.apiUrl;
  entity = 'events/';
  eventObject;
  httpOptions: any;
  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) {
    this.httpOptions = this.authService.getHeaders();
    console.log(this.httpOptions);
  }

  public getAllEvents() {
    // now returns an Observable of Config
    const events$ = this.http.get(this.apiUrl + this.entity + 'oftype/1', this.httpOptions);
    return events$;
  }
  public readByKey(key) {
    // now returns an Observable of Config
    const event$ = this.http.get(this.apiUrl + this.entity + key + '/html', this.httpOptions);
    return event$;
  }
  public getEventsTickets(key) {
    // now returns an Observable of Config
    const event$ = this.http.get(this.apiUrl + this.entity + key + '/tickets', this.httpOptions);
    return event$;
  }
  public saveEventOject(event_object) {
    this.eventObject = {};
    this.eventObject = event_object;
  }
  public getEventObject() {
    return this.eventObject;
  }
}


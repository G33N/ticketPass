import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventsService {
  apiUrl = environment.apiUrl;
  entity = 'events/';
  eventObject;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line:max-line-length
      'Authorization': 'bearer zA3vhbLEbUThXX9eDy-5Xfswd4xvJur7kSyU0ambhLtJB-D_U9z7CbxskuWTJRZteG2j1qsQB7XVNzN-URUzC0Gvsim9RDzSsWvA82R1hVM86RVkEUkI19ZyTb6EU57Bf_tHk9yqMI46dbEm2bFqndlctQIyyTIuSzlPOY9RrPNykr5yJ9Mwac4EpkbN1fOSVm9cxEiIiakDUrtNRpGVYfFXrSqt0tFDqaz_ExLXRIBmCmlrR8D5bPZeaCgHgAPS8mPw4lSyMF8YeHIUUmxPOqZ7lQtw-FcVPKRVsB2avuXK6yIt0ANHgBusbb4yCzmWdlnbAvbSX8ctl87prCxzzfkSu6BFpDNyLlpGfYDc5qCkimR6CMfe4XrOJakSlfieK7FCxmzYNyHKQ2CVlcX9fEbSRJvr4pQPgvck6lYV6pnayU0Ll5B1iNcIFTWlq2SBoPZpcndN16t8Saps9rbxgccdMMsEDN5XWXhk0MfckaA'
    })
  };
  constructor(
    private http: HttpClient
  ) { }

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
  public getEventObject(){
    return this.eventObject;
  }
}


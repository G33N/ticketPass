import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventsService {
  apiUrl = environment.apiUrl;
  entity = 'events/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line:max-line-length
      'Authorization': 'bearer vkA2_gbgijwmIznlaHL4YDkmkRhNNQOIcKzN5L6yYU63yq-aTBjTHRLLhFYBcmv65vf3jwWDtltOoy00Ntx_H-HPoLO2fLpn02oayZPVl06L3NuRdLLXthqB9IrNe770iGwTRk73D0bnHSSywuV6_PSqNJIxggu88LQ9Kz7pA0_t7gT8QnHs4D_BXXS3p7ASMKD3iC2D-6Ehb3pP2Hixz9_wYjh2JUgtdPZJIr7tPDd-RPzyeqvF-gTgyOyC9wREi0J3JnJsFR7wJLfvhsz-4ddRjOKzHGy1ta2OdCkMql6NammuDq8v8yGvuqJm8l6AqbULXiASe2_d-wSzFhO-Ih__8Yb5RguugdA3_kCAdbZ8Gh6wNVs1MMX1BCVpK5inbEfXXKMqWWwo8QqfN4MRDEMK4JKhARNBcUd3lM1K6qsyBdOXpATbSETXeXJXlUeTiwuyNpyWEsQBoOTyo3vxGln1KolsJ52RdxHFdRX734Y'
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
}

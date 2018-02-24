import { EventsService } from './../services/events/events.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events';
// ROUTER
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventKey: String;
  event: any;
  event$: any;
  ticket: any;
  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.read(this.getRouteParams());
  }

  read(key) {
    this.event$ = this.eventsService.readByKey(key);
    this.event$.subscribe(snapshot => {
      this.event = snapshot;
    });
  }

  getRouteParams() {
    // READ ROUTE PARAMS
    let param: any;
    this.route.params.subscribe((params: Events) => param = params);
    this.eventKey = param.Id;
    return param.Id;
  }

  public calculatePrice() {
    // Calculate price of the quantity
    this.ticket.total = this.ticket.quantity * this.ticket.price;
  }

}

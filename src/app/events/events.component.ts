import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EventsService } from './../services/events/events.service';
import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events$: any;
  showSpinner = true;
  events: any;
  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.events$ = this.eventsService.getAllEvents().subscribe(events => {
      this.events = events as Events[];
      this.showSpinner = false;
    });
  }

}

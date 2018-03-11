import { Component, OnInit } from '@angular/core';
import { EventsService } from './../services/events/events.service';
// ROUTER
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events$: any;
  events: any;

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.events$ = this.eventsService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

  goToEventDetails(event) {
    this.router.navigate(['/content/event', event.Id]);
  }

}

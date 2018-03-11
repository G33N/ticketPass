import { MercadoPagoService } from './../services/mercado-pago/mercado-pago.service';
import { EventsService } from './../services/events/events.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Events } from '../models/events';
import { Ticket } from '../models/ticket';
// ROUTER
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// FORMS
import { CurrencyPipe } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventKey: String;
  event: any;
  event$: any;
  events$: any;
  events;
  tickets$: any;
  tickets: Ticket[];
  total: number = 0;

  constructor(
    private eventsService: EventsService,
    private mercadoPagoService: MercadoPagoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.event = [];
    this.event$ = [];
  }

  read(key): void {
    this.event$ = this.eventsService.readByKey(key);
    this.event$.subscribe(snapshot => {
      this.event = snapshot;
    });
  }

  getRouteParams() {
    // READ ROUTE PARAMS
    let param: any;
    this.route.params.subscribe((params: Events) => param = params);
    this.eventKey = param.id;
    return param.id;
  }

  calculatePrice(qty, ticketId): void {
    let temporal_total = 0;
    this.total = 0;
    for (const key in this.tickets) {
      if(this.tickets[key].Id === ticketId) {
        this.tickets[key].Quantity = parseInt(qty);
      }
      this.total += this.tickets[key].Price * this.tickets[key].Quantity;
    }
  }

  getTickets(key) {
    // Get all ticket of the event
    this.tickets$ = this.eventsService.getEventsTickets(key);
    this.tickets$.subscribe(snapshot => {
      this.tickets = snapshot;
      for (const ticket_key in this.tickets) {
        this.tickets[ticket_key].Quantity = 1;
        this.total += this.tickets[ticket_key].Price * this.tickets[ticket_key].Quantity;
      }
      });
  }

  getImage(images) {
    let imageUri = '';
    images.forEach(image => {
      if (image.IsDefault) {
        imageUri = image.Uri;
      }
    });
    return imageUri;
  }
  
  getAllEvents() {
    this.events$ = this.eventsService.getAllEvents();
    this.events$.subscribe(snapshot => {
      this.events = snapshot;
    });
  }

  buy(): void {
    this.mercadoPagoService.getPaymentMethods();
  }

  goToSale() {
    let event = {
      tickets: this.tickets,
      total: this.total,
      eventId: this.getRouteParams()
    };
    this.eventsService.saveEventOject(event);
    this.router.navigate(['/content/sale']);
  }

  ngOnInit() {
    this.read(this.getRouteParams());
    this.getTickets(this.getRouteParams());
  }

}

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
  tickets$: any;
  tickets: Ticket[];
  total: number;

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

  calculatePrice(): void {
    // Calculate price of the quantity
  }

  getTickets(key) {
    // Get all ticket of the event
    this.tickets$ = this.eventsService.getEventsTickets(key);
    this.tickets$.subscribe(snapshot => {
      this.tickets = snapshot;
      // snapshot.forEach(element => {
      //   const ticket = {
      //     Id: element.Id,
      //     Name: element.Name,
      //     Price: element.Price,
      //     Quantity: element.Quantity,
      //     Remaining: element.Remaining
      //   };
      //   this.tickets.push(ticket);
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

  buy(): void {
    this.mercadoPagoService.getPaymentMethods();
  }

  ngOnInit() {
    this.read(this.getRouteParams());
    this.getTickets(this.getRouteParams());
  }
}

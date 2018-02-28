import { MercadoPagoService } from './../services/mercado-pago/mercado-pago.service';
import { EventsService } from './../services/events/events.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events';
// ROUTER
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// FORMS
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventKey: String;
  event: any;
  event$: any;
  ticket: { total: any, price: any, quantity: any };
  constructor(
    private eventsService: EventsService,
    private mercadoPagoService: MercadoPagoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.read(this.getRouteParams());
    this.ticket = { total: 250, price: 250, quantity: 1 };
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
    this.eventKey = param.id;
    return param.id;
  }

  calculatePrice(): void {
    // Calculate price of the quantity
    this.event = this.ticket.total = this.ticket.quantity * this.ticket.price;
  }

  buy(): void {
    this.mercadoPagoService.getPaymentMethods();
  }

}

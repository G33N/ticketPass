import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { Router } from '@angular/router';
import { ResellerService } from '../services/reseller/reseller.service';
import { MercadoPagoService } from '../services/mercado-pago/mercado-pago.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  public eventObject;
  public resellers$;
  public resellers;
  public payments$;
  public payments;
  public creditCardToken$;
  public creditCardToken;
  public credit_card = {
    'email': '',
    'cardNumberLength': '',
    'securityCode': '',
    'expiration_month': '',
    'expiration_year': '',
    'cardholder':
      {
        'identification':
          {
            'number': '',
            'type': 'DNI'
          },
        'name': 'APRO'
      }
  }
  public paymentId: string;


  constructor(
    private eventsService: EventsService,
    private resellerService: ResellerService,
    private mercadoPagoService: MercadoPagoService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.resellers$ = this.eventsService.getAllEvents();
    this.resellers$.subscribe(snapshot => {
      this.resellers = snapshot;
    });
    this.payments$ = this.mercadoPagoService.getPaymentMethods();
    this.payments$.subscribe(snapshot => {
      this.payments = snapshot;
    });
    this.eventObject = this.eventsService.getEventObject();
    if (!this.eventObject) {
      this.router.navigate(['/content/events']);
    }

  }

  buildCreditCard() {
    this.credit_card.cardholder.identification.number = this.credit_card.cardholder.identification.number.toString();
    this.creditCardToken$ = this.mercadoPagoService.getTokenCreditCard(this.credit_card);
    this.creditCardToken$.subscribe(snapshot => {
      this.creditCardToken = snapshot.id;
      if(this.creditCardToken) {
        this.sendToMercadoPago(this.creditCardToken);
      }
    });

  }

  sendToMercadoPago(creditCardToken) {
    let orders = {
      'PaymentInformation': {
        'CreditCardToken': creditCardToken,
        'PaymentMethodId': this.paymentId,
        'PayerEmail': this.credit_card.email,
        'PayerIdentificationType': this.credit_card.cardholder.identification.type,
        'PayerIdentificationNumber': this.credit_card.cardholder.identification.number
      },
      'EventId': this.eventObject.eventId,
      'TicketsOrder': []
    };

    for (let ticket_key in this.eventObject.tickets) {
      let ticket = {
        TicketTypeId: this.eventObject.tickets[ticket_key].Id,
        Units: this.eventObject.tickets[ticket_key].Quantity
      }
      orders.TicketsOrder.push(ticket);
    }
    this.mercadoPagoService.sendOrders(orders).subscribe(
      success => {
        console.log('success', success);
      }
    );

  }

}

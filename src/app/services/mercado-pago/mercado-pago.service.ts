import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MercadoPagoService {
  apiUrl = environment.apiUrl;
  entity = 'mercadopago/paymentmethods/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line:max-line-length
      'Authorization': 'bearer PnX3OCmGII-k44Vso0Mvi8pVUXkTAuLxeFVYjNW7lDZT5HqQ_Whq0l5_wETA6LTQYLcyfOeO-_J-GfWuxpN0p7WW8SeTD_N3_nuafrxODGIKhYntSeL1rL4Yr3chvwcyFW54Ef08uGis9tQhRD955O5UfzL6m53Z42l7hBHvC2TefAPj19utFYGjZL4kH9TEJYlVGeDlHDJ3xCw8KISqvCUfegZLEtJo14xVT6RoIqpbhZKnDgFdeMbSC9w67xRbFK5YS9eTvS2ZqHSHUZ62LEG1Ih7otw85pLwbt5Dm53buZ0DM0XY5n8-thxQMLAvHWZRuti7UM5mJF2Qa4V0RZ_uIcIq6sfRbPdyg4OP96FgL-4d0tKQT7xBr1r9qQqZgeLR46DNw2bbGzYDvH4rP3soXB_XrkyyUFVMAt-EDOMW3wN8eA20HMYNoU0AP-6u_LhGl1Fbh5u69akE8TYUtV73DoEGnFpIA8QTIxGET0kMEXzOf78Nq5THmDk6KWoPQx1VMBKXnQQsdcCH907zbhg'
    })
  };
  constructor(private http: HttpClient) {
  }

  public getPaymentMethods() {
    // now returns an Observable of Config
    const mpMethods$ = this.http.get(this.apiUrl + this.entity, this.httpOptions);
    return mpMethods$;
  }

  public getTokenCreditCard(credit_card) {
    const mpCreditCard$ = this.http.post('https://api.mercadopago.com/v1/card_tokens?public_key=TEST-18184d45-13bc-45a8-ba74-f034d5ecc826', credit_card);
    return mpCreditCard$;
  }

  public sendOrders(order) {
      const mpOrders$ = this.http.get(this.apiUrl + 'orders', this.httpOptions);
      return mpOrders$;
  }
}

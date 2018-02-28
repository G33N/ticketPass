import { TestBed, inject } from '@angular/core/testing';

import { MercadoPagoService } from './mercado-pago.service';

describe('MercadoPagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MercadoPagoService]
    });
  });

  it('should be created', inject([MercadoPagoService], (service: MercadoPagoService) => {
    expect(service).toBeTruthy();
  }));
});

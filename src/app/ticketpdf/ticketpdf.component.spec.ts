import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketpdfComponent } from './ticketpdf.component';

describe('TicketpdfComponent', () => {
  let component: TicketpdfComponent;
  let fixture: ComponentFixture<TicketpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

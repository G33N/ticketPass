import { LoginService } from './services/login/login.service';
import { MercadoPagoService } from './services/mercado-pago/mercado-pago.service';
import { EventsService } from './services/events/events.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { routes } from './app.routing';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './ui/loading/loading.component';

import { FormsModule } from '@angular/forms';
import { FacebookModule } from 'ngx-facebook';
import { SaleComponent } from './sale/sale.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    LoginComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    HeaderComponent,
    ContactComponent,
    LoadingComponent,
    SaleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routes,
    FormsModule,
    FacebookModule.forRoot()
  ],
  providers: [
    EventsService,
    MercadoPagoService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

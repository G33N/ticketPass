import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { SaleComponent } from './sale/sale.component';
import { TicketpdfComponent } from './ticketpdf/ticketpdf.component';

// AuthGuard
import { AuthGuard } from './services/auth-guard/auth-guard.service';

export const router: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'event/:id',
        component: EventComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sale',
        component: SaleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ticketpdf',
        component: TicketpdfComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const routes = RouterModule.forRoot(router);

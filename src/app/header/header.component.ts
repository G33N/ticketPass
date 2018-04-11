import { log } from 'util';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.logged = this.authService.checkLoggin();
  }
  login() {
    this.authService.facebookLogin();
  }
  logout() {
    this.authService.logout();
  }
}

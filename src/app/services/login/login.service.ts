import { Injectable } from '@angular/core';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent, InitParams } from 'ngx-facebook';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LoginService {
  apiUrl = environment.apiUrl;
  entity = 'events/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  currentSession: any;
  constructor(private fb: FacebookService, private http: HttpClient) {
    const initParams: InitParams = {
      appId: '1686748781602658',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
  }

  loginFacebook() {
    // login without options
    this.fb.login()
      .then((response: LoginResponse) => function() {
        console.log('Logged in', this.currentSession);
        this.currentSession = response;
      })
      .catch(e => console.error('Error logging in'));

    // login with options
    const options: LoginOptions = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
      .then()
      .catch();
  }
  loginAPI() {
    // now returns an Observable of Config
    const loginAPI$ = this.http.get(this.apiUrl + this.entity + '/html', this.httpOptions);
    return loginAPI$;
  }
  getLoginStatus() {
    this.fb.getLoginStatus()
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  }
  logoutFaceboook() {
    this.fb.logout().then(() => console.log('Logged out!'));
  }
}

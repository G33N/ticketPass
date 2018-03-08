import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  apiUrl = environment.apiUrl;
  entity = '/authentication/externallogin/';
  currentSession: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    // Get auth data
    this.user = this.afAuth.authState;
  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider).then(response => {
      return response;
    }).catch(e => console.log(e));
  }

  facebookLogin(): void {
    const provider = new firebase.auth.FacebookAuthProvider();
    let authResponse: any;
    this.oAuthLogin(provider)
      .then(response => {
        authResponse = response;
        this.apiLogin(authResponse.credential.accessToken);
      })
      .catch(e => console.log(e));
  }

  apiLogin(accessToken) {
    const body = {
      ClientId: 789473954,
      ClientSecret: 'APYe9ptcfOorzJWrIJbSRBB8wl7CqmO8pLcaI1zNapBNyGGEUvPWQY7hZgJYKa8hhg==',
      Provider: 'Facebook',
      ExternalAccessToken: accessToken,
    };
    this.http.post(this.apiUrl + this.entity, body).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(response => {
        console.log('Logged out');
      })
      .catch(e => console.log(e));
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
}

import { Http } from '@angular/http';
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
  public httpOptions: any;
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

  async apiLogin(accessToken) {
    const body = {
      ClientId: 789473954,
      ClientSecret: 'APYe9ptcfOorzJWrIJbSRBB8wl7CqmO8pLcaI1zNapBNyGGEUvPWQY7hZgJYKa8hhg==',
      Provider: 'Facebook',
      ExternalAccessToken: accessToken,
    };
    await this.http.post(this.apiUrl + this.entity, body).subscribe(
      data => {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //  'Authorization': `${data.token_type} ${data.access_token}`
            // tslint:disable-next-line:max-line-length
            'Authorization': 'bearer vkA2_gbgijwmIznlaHL4YDkmkRhNNQOIcKzN5L6yYU63yq-aTBjTHRLLhFYBcmv65vf3jwWDtltOoy00Ntx_H-HPoLO2fLpn02oayZPVl06L3NuRdLLXthqB9IrNe770iGwTRk73D0bnHSSywuV6_PSqNJIxggu88LQ9Kz7pA0_t7gT8QnHs4D_BXXS3p7ASMKD3iC2D-6Ehb3pP2Hixz9_wYjh2JUgtdPZJIr7tPDd-RPzyeqvF-gTgyOyC9wREi0J3JnJsFR7wJLfvhsz-4ddRjOKzHGy1ta2OdCkMql6NammuDq8v8yGvuqJm8l6AqbULXiASe2_d-wSzFhO-Ih__8Yb5RguugdA3_kCAdbZ8Gh6wNVs1MMX1BCVpK5inbEfXXKMqWWwo8QqfN4MRDEMK4JKhARNBcUd3lM1K6qsyBdOXpATbSETXeXJXlUeTiwuyNpyWEsQBoOTyo3vxGln1KolsJ52RdxHFdRX734Y'
          })
        };
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

  public getHeaders() {
    console.log(this.httpOptions);
    return this.httpOptions;
  }

  public checkLoggin(): boolean {
    let status = false;
    if (this.afAuth.auth.currentUser) {
      status = true;
    }
    return status;
  }
}

import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* MODEL */
import { User } from './../../models/user.model';

/* GLOBAL VARIABLES */
import { GLOBAL } from './../global';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {}

  createUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'register', params, { headers: headers });
  }

  login(user: User, gettoken = null): Observable<any> {
    if (gettoken != null) user.gettoken = gettoken;

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Villager, Authenticate } from '../models/villager.model';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  api_url = 'http://localhost:3000';
  signInUrl = `${this.api_url}/api/villagers/signin`;

  constructor(
    private http: HttpClient
  ) { }

  login({ email, password }: Authenticate): Observable<Villager> {

    return this.http.post(`${this.signInUrl}`, { email, password })
      .map(res => {
          this.setSession(res);
          return res['villager'] as Villager;
      }).shareReplay();
  }

  private setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn, 'second');

      localStorage.setItem('id_token', authResult.token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): Observable<boolean> {
      return Observable.of(moment().isBefore(this.getExpiration()));
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      return moment(JSON.parse(localStorage.getItem('expires_at')));
  }
}

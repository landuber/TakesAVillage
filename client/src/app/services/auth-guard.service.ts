import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Auth from '../store/auth/auth.actions';
import * as fromRoot from '../store/reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  loggedIn: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedIn = this.store
      .select(fromRoot.getLoggedIn)
      .map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LoginRedirect());
          return false;
        }

        return true;
      })
      .take(1);
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(new Auth.RefreshLoginState());

    return this.loggedIn;
  }
}

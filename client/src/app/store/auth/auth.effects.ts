import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';

import * as RouterActions from '../router/router.actions';
import { AuthService } from '../../services/auth.service';
import {
  Login,
  Logout,
  LoginSuccess,
  LoginFailure,
  RefreshLoginState,
  RefreshLoginStateSuccess,
  AuthActionTypes,
} from './auth.actions';
import { Villager, Authenticate } from '../../models/villager.model';

@Injectable()
export class AuthEffects {

RefreshLoginStateSuccess

  @Effect()
  refreshLoginState$: Observable<Action> = this.actions$.
    ofType<RefreshLoginState>(AuthActionTypes.RefreshLoginState)
    .exhaustMap(() =>
      this.authService
        .isLoggedIn()
        .map(loggedIn => ({ type: AuthActionTypes.RefreshLoginStateSuccess, payload: { loggedIn: loggedIn } })));

  @Effect()
  login$: Observable<Action> = this.actions$.
    ofType<Login>(AuthActionTypes.Login)
    .map((action: Login) => action.payload)
    .exhaustMap((auth: Authenticate) =>
      this.authService
        .login(auth)
        .map(villager => ({ type: AuthActionTypes.LoginSuccess, payload: { villager: villager } }))
        .catch(error => of(new LoginFailure(error)))
        );


  @Effect()
  logout$: Observable<Action> = this.actions$.
        ofType<Logout>(AuthActionTypes.Logout)
        .map(() =>
            {
                this.authService.logout();
                return new RouterActions.Go({ path:['/login'] });
            }
        );

  @Effect()
  loginSuccess$: Observable<Action> = this.actions$
    .ofType<LoginSuccess>(AuthActionTypes.LoginSuccess)
    .map(() => new RouterActions.Go({ path: ['/'] }));

  @Effect()
  loginRedirect$: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout)
    .map(authed => new RouterActions.Go({ path:['/login'] }));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}

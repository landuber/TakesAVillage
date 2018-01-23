import { Action } from '@ngrx/store';
import { Villager, Authenticate } from '../../models/villager.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  RefreshLoginState = '[Auth] Refresh Login State',
  RefreshLoginStateSuccess =  '[Auth] Refresh Login State Success',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { villager: Villager }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class RefreshLoginState implements Action {
    readonly type = AuthActionTypes.RefreshLoginState;
}

export class RefreshLoginStateSuccess implements Action {
    readonly type = AuthActionTypes.RefreshLoginStateSuccess;

    constructor(public payload: { loggedIn: boolean }) {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | RefreshLoginState
  | RefreshLoginStateSuccess;

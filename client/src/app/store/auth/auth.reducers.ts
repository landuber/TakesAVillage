import { AuthActions, AuthActionTypes } from './auth.actions';
import { Villager } from '../../models/villager.model';

export interface State {
  loggedIn: boolean;
  villager: Villager | null;
}

export const initialState: State = {
  loggedIn: false,
  villager: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.RefreshLoginStateSuccess: {
        return {
            ...state,
            loggedIn: action.payload.loggedIn
        };
    }
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        villager: action.payload.villager,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getVillager = (state: State) => state.villager;

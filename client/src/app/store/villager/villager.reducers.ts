import { Villager } from '../../models/villager.model';
import * as VillagerActions from './villager.action';

export interface State extends Villager {
    loading:boolean;
    loaded:boolean;

    editable: boolean;
    edited: boolean;
    editing:boolean;

    creating: boolean;
    created: boolean;

    error: boolean;
}

export const initialState = { ...new Villager(), 
    ...{
        loading: false,
            loaded: false,

            editable: true,
            edited: false,
            editing:false,

            creating: false,
            created: false,

            error: false
    }
};

export type Action = VillagerActions.All;

export function reducer(state = initialState, action: Action): State {
    switch(action.type) {
        case VillagerActions.UPDATE_VILLAGER: {
            return { ...state, ...action.payload};
        }
        case VillagerActions.CREATE_VILLAGER_SUCCESS: {
           return {...state, created: true};
        }
        case VillagerActions.CREATE_VILLAGER_FAIL: {
            return { ...state, error: true };
        }
        case VillagerActions.GET_VILLAGER: {
            return { ...state, loading: true }
        }
        case VillagerActions.GET_VILLAGER_SUCCESS: {
            return { ...state, ...action.payload, loading: false, loaded: true };
        }
        case VillagerActions.GET_VILLAGER_FAIL: {
            return { ...state, loading: false, error: true };
        }
        default: {
            return state;
        }
    }

}

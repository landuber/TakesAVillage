import { Villager } from '../../models/villager.model';

export interface VillagerState extends Villager {
    loading:boolean;
    loaded:boolean;

    editable: boolean;
    edited: boolean;
    editing:boolean;

    creating: boolean;
    created: boolean;

    error: boolean;
}

export const initializeVillagerState = function() {
    return { ...new Villager(), 
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
}


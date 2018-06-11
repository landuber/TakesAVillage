import { Action } from '@ngrx/store';
import { Villager } from '../../models/villager.model';
import { VillagerState } from './villager.state';


export const UPDATE_VILLAGER = '[Villager] Update Villager';

export const CREATE_VILLAGER = '[Villager] Create Villager';
export const CREATE_VILLAGER_SUCCESS = '[Villager] Create Villager Success';
export const CREATE_VILLAGER_FAIL = '[Villager] Create Villager Fail';



export const GET_VILLAGER = '[Villager] Get Villager'; 
export const GET_VILLAGER_SUCCESS = '[Villager] Get Villager Success'; 
export const GET_VILLAGER_FAIL = '[Villager] Get Villager Fail'; 


export class UpdateVillager implements Action {
    readonly type = UPDATE_VILLAGER; 

    constructor(public payload: any){} 

} 


export class CreateVillager implements Action {
    readonly type = CREATE_VILLAGER; 

    constructor(public payload: any) {}

} 

export class CreateVillagerSuccess implements Action {
    readonly type = CREATE_VILLAGER_SUCCESS; 

    constructor(){} 
} 

export class CreateVillagerFail implements Action {
    readonly type = CREATE_VILLAGER_FAIL; 

    constructor(public payload: any) {}
} 

export class GetVillager implements Action {
    readonly type = GET_VILLAGER; 

    constructor(public payload: string){} 

} 

export class GetVillagerSuccess implements Action {
    readonly type = GET_VILLAGER_SUCCESS; 

    constructor(public payload: Villager){} 
} 

export class GetVillagerFail implements Action {
    readonly type = GET_VILLAGER_FAIL; 

    constructor(public payload: any) {}
} 

export type All = UpdateVillager | CreateVillager | CreateVillagerSuccess | CreateVillagerFail |
    GetVillager | GetVillagerSuccess | GetVillagerFail;



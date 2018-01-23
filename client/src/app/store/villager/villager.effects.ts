import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as RouterActions from '../router/router.actions';
import * as VillagerActions from './villager.action';
import { VillagerService } from '../../services/villager.service';


@Injectable()
export class VillagerEffects {


  @Effect()
  CreateVillager$: Observable<Action> = this.actions$.
        ofType<VillagerActions.CreateVillager>(VillagerActions.CREATE_VILLAGER)
        .map((action: VillagerActions.CreateVillager) => action.payload)
        .mergeMap(villager =>
            this.villagerService.createVillager(villager)
                .map(() => new VillagerActions.CreateVillagerSuccess(villager))
                .catch((error) => of(new VillagerActions.CreateVillagerFail(error)))
        );


  @Effect()
  loginSuccess$: Observable<Action> = this.actions$
    .ofType<VillagerActions.CreateVillagerSuccess>(VillagerActions.CREATE_VILLAGER_SUCCESS)
    .map(() => new RouterActions.Go({ path: ['/login'] }));

  /*
  @Effect({ dispatch: false })
  logActions$ = this.actions$
    .do(action => {
      console.log(action);
    });
    */

  constructor(
    private villagerService: VillagerService,
    private actions$: Actions
  ) { }
  
}

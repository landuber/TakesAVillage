import { Villager } from '../models/villager.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class VillagerService {

  api_url = 'http://localhost:3000';
  villagerUrl = `${this.api_url}/api/villagers`;

  constructor(
    private http: HttpClient
  ) { }


  createVillager(villager): Observable<any> {
      return this.http.post(`${this.villagerUrl}`, villager);
  }

  getVillagers(): Observable<Villager[]>{
      return this.http.get(this.villagerUrl)
      .map(res => {
          return res['data'].docs as Villager[];
      });
  }

  editVillager(villager: Villager) {
      let editUrl = `${this.villagerUrl}`;
      return this.http.put(editUrl, villager);
  }

  deleteTodo(id: string): any {
      let deleteUrl = `${this.villagerUrl}/${id}`;
      return this.http.delete(deleteUrl)
      .map(res => {
          return res;
      });
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

}

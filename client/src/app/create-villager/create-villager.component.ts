import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Villager, Address } from '../models/villager.model';
import * as fromRoot from '../store/reducers';
import { VillagerState, initializeVillagerState } from '../store/villager/villager.state';
import * as VillagerActions from '../store/villager/villager.action';

@Component({
  selector: 'create-villager',
  templateUrl: './create-villager.component.html',
  styleUrls: ['./create-villager.component.scss']
})
export class CreateVillagerComponent implements OnInit {

  constructor(
      private fb: FormBuilder,
      private store: Store<fromRoot.State>
  ) { 
      this.createForm();
  }

  createForm() {
      this.villagerForm = this.fb.group({
            id : ['', Validators.required ],
            email : ['', Validators.required ],
            password : ['', Validators.required ],
            confirmpassword : ['', Validators.required ],
            firstname : ['', Validators.required ],
            middlename : [''],
            lastname : ['', Validators.required ],
            address: this.fb.group({
                street : ['', Validators.required ],
                city   : ['', Validators.required ],
                state  : ['', Validators.required ],
                zip    : ['', Validators.required ]
            }),
            ssn : ['', Validators.required ],
            shortbio : [''] 
      });
  }

  public villager: Villager = new Villager();

  villagerForm: FormGroup;

  
  prepareSaveVillager(): Villager {
      const formModel = this.villagerForm.value;

      const saveVillager: Villager = { ...this.villager, ...{
          email: formModel.email as string,
          password: formModel.password as string,
          firstname: formModel.firstname as string,
          middlename: formModel.middlename as string,
          lastname: formModel.lastname as string,
          address: new Address(formModel.address.street,
                               formModel.address.city,
                               formModel.address.state,
                               formModel.address.zip),
          ssn: formModel.ssn as string,
          shortbio: formModel.shortbio as string
        }
      };

      return saveVillager;

  }
  ngOnInit(): void {
  }

  onSubmit() {
      this.villager = this.prepareSaveVillager();
      this.store.dispatch(new VillagerActions.CreateVillager(this.villager));
  }

}

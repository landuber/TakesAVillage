import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Villager, Address } from '../models/villager.model';
import * as fromRoot from '../store/reducers';
import * as VillagerActions from '../store/villager/villager.action';
import * as RouterActions from '../store/router/router.actions';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {


  constructor(
      private fb: FormBuilder,
      private store: Store<fromRoot.State>
  ) { 
      this.villager$ = this.store.select('villager');
  }

  createForm(villager: Villager) {
      this.villagerForm = this.fb.group({
            cardholdername : [villager.paymentinfo.cardholdername, Validators.required ],
            cardnumber : [villager.paymentinfo.cardnumber, Validators.required ],
            expmonth : [villager.paymentinfo.expmonth, Validators.required ],
            expyear : [villager.paymentinfo.expyear, Validators.required ],
            cvv : [villager.paymentinfo.cvv, Validators.required ],
            address: this.fb.group({
                street : [villager.paymentinfo.address.street, Validators.required ],
                city   : [villager.paymentinfo.address.city, Validators.required ],
                state  : [villager.paymentinfo.address.state, Validators.required ],
                zip    : [villager.paymentinfo.address.zip, Validators.required ]
            })
      });
  }

  public villager$: Observable<Villager>;

  villagerForm: FormGroup;

  ngOnInit(): void {
      this.villager$.subscribe(villager => {
          this.createForm(villager);
      });
  }

  onNext() {
      this.store.dispatch(new VillagerActions.UpdateVillager({paymentinfo: this.villagerForm.value}));
      this.store.dispatch(new RouterActions.Go({ path:['/review'] }));
  }

  onBack() {
      this.store.dispatch(new RouterActions.Go({ path:['/register'] }));
  }


}

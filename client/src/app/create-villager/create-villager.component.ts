import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Villager, Address } from '../models/villager.model';
import * as fromRoot from '../store/reducers';
import * as VillagerActions from '../store/villager/villager.action';
import * as RouterActions from '../store/router/router.actions';
import { PasswordValidation } from '../shared/validators';

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
      this.villager$ = this.store.select(fromRoot.getVillagerState)
;
  }

  createForms(villager: Villager) {
      this.villagerForm = this.fb.group({
          email : [villager.email, 
              [
                  Validators.required, 
                  Validators.email
              ]
          ],
          passwordGroup: this.fb.group({
              password : [villager.password, Validators.required ],
              confirmpassword : [villager.password, Validators.required ]
          }, {
              validator: PasswordValidation.MatchPassword
          }),
          firstname : [villager.firstname, 
              [
                  Validators.required,
                  Validators.pattern("[a-zA-Z][a-zA-Z ]+")
              ]
          ],
          middlename : [villager.middlename,
              [
                  Validators.pattern("[a-zA-Z][a-zA-Z ]+")
              ]
          ],
          lastname : [villager.lastname, 
              [
                  Validators.required,
                  Validators.pattern("[a-zA-Z][a-zA-Z ]+")
              ]
          ],
          address: this.fb.group({
              street : [villager.address.street, Validators.required ],
              city   : [villager.address.city, Validators.required ],
              state  : [villager.address.state, Validators.required ],
              zip    : [villager.address.zip, 
                          [
                              Validators.required ,
                              Validators.pattern(/^\d{5}$/)
                          ]
              ]
          }),
          phonenumber : [villager.phonenumber, 
                            [
                                Validators.required ,
                                Validators.pattern(/^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/)
                            ]
          ]
      });

      this.paymentInfoForm = this.fb.group({
          cardholdername : [villager.paymentinfo.cardholdername, 
              [
                  Validators.required,
                  Validators.pattern("[a-zA-Z][a-zA-Z ]+")
              ]
          ],
          cardnumber : [villager.paymentinfo.cardnumber,
              [
                  Validators.required,
                  Validators.pattern(/^\d{1,16}$/)
              ]
          ],
          expmonth : [villager.paymentinfo.expmonth,
              [
                  Validators.required,
                  Validators.pattern(/[1-9]|1[012]/)
              ]
          ],
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
  paymentInfoForm: FormGroup;

  ngOnInit(): void {
      this.villager$.first().subscribe(villager => {
          this.createForms(villager);
      });
  }

  onNext(event) {
      if(event.previouslySelectedIndex == 0) {
        var basicInfo = this.villagerForm.value;
        basicInfo.password = basicInfo.passwordGroup.password;
        this.store.dispatch(new VillagerActions.UpdateVillager(basicInfo));
      } else if(event.previouslySelectedIndex == 1){
        this.store.dispatch(new VillagerActions.UpdateVillager({paymentinfo: this.paymentInfoForm.value}));
      } 
  }

  onSubmit(event) {
      this.villager$.first().subscribe(villager => {
          this.store.dispatch(new VillagerActions.CreateVillager(villager));
      });
  }

}

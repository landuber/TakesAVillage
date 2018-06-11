import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers';
import * as AuthActions from '../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private store: Store<fromRoot.State>,
      private fb: FormBuilder
  ) { 
      this.createForm();
  }

  loginForm: FormGroup;

  createForm() {
   this.loginForm = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required]
        });
  }

  ngOnInit() {
  }

  onSubmit() {
      if(this.loginForm.valid) {
          this.store.dispatch(new AuthActions.Login(this.loginForm.value));
      }
  }

  isFieldInvalid(field: string) { // {6}
      var ctrl = this.loginForm.get(field);
      return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

}

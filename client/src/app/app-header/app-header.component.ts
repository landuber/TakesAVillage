import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../store/reducers';
import * as AuthActions from '../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    loggedIn$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.loggedIn$ = this.store
            .select(fromRoot.getLoggedIn)
            .take(1);
    }

    onLogout() {
          this.store.dispatch(new AuthActions.Logout());
    }

}

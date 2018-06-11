import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule, 
         MatButtonModule, 
         MatCardModule, 
         MatStepperModule,
         MatDialogModule } from '@angular/material';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { VillagerService } from './services/villager.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { AuthInterceptor } from './services/auth.interceptor';

import { VillagerEffects } from './store/villager/villager.effects';
import { AuthEffects } from './store/auth/auth.effects';
import { RouterEffects } from './store/router/router.effects';
import { reducers, metaReducers } from './store/reducers';

import { CustomRouterStateSerializer } from './shared/utils';
import { environment } from '../environments/environment';



import { AppComponent } from './app.component';
import { CreateVillagerComponent } from './create-villager/create-villager.component';
import { LoginComponent } from './login/login.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { ReviewComponent } from './review/review.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    // { path: 'register', component: CreateVillagerComponent, canActivate:[AuthGuard] },
    { path: 'register', component: CreateVillagerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'review', component: ReviewComponent },
    { path: 'payment-info', component: PaymentInfoComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CreateVillagerComponent,
    LoginComponent,
    PaymentInfoComponent,
    ReviewComponent,
    AppHeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatDialogModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([RouterEffects,
        AuthEffects,
        VillagerEffects]),
    RouterModule.forRoot(routes, { useHash: true }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: RouterStateSerializer,
        useClass: CustomRouterStateSerializer
    },
    AuthService,
    AuthGuard,
    VillagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
